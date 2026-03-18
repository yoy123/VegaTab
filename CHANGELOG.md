# Changelog & Session Log

## Session: March 18, 2026

Full development session documenting all changes, decisions, and tuning work done on VGTab.

---

### 1. macOS 15.1.1 Compatibility Update

**Problem:** The original VGTab was built for older macOS versions and wouldn't launch on macOS 15.1.1 (Sequoia).

**Fix:** Updated `Info.plist` to set `LSMinimumSystemVersionByArchitecture` → `x86_64` → `15.1`. Verified the kext generation pipeline (plist patching via `PlistBuddy`, binary PowerPlay table injection) works correctly on Sequoia.

**Files changed:**

- `Contents/Info.plist`

---

### 2. Save & Load Settings Feature

**Problem:** Tuning Vega GPU settings is a trial-and-error process. Each time you want to try different values, you had to manually re-enter dozens of slider positions. There was no way to save a working configuration or quickly roll back to a previous one.

**Solution:** Added Save Settings and Load Settings buttons to every GPU configuration page.

#### Save Settings

- Reads all current UI values (core clocks P0–P7, core voltages P0–P7, memory clocks P0–P3, memory voltage P3, fan speeds, fan sensitivity, target temperature, TDC)
- Exports to a human-readable `.txt` file with one `key=value` per line
- Downloads as `VegaTab_<GPU>_settings.txt`
- The shell script (`VGtab.sh`) also saves the same format to Desktop when building a kext

#### Load Settings

- Opens a native file picker (accepts `.txt` files)
- Parses the settings file and restores all values to the UI
- Updates sliders, number inputs, and the Chart.js graph simultaneously
- Uses a `settingsMap` object that maps each setting key to its corresponding DOM elements

#### Implementation Details

**`js/create.js` additions:**

```javascript
// settingsMap — maps setting keys to UI element IDs
var settingsMap = {
    "P0cv": {num: "num_0_0", rag: "rag_0_0", dataset: 0, idx: 0},
    // ... all P-state clocks, voltages, fan, temp, power
};

function saveSettings(device) { /* exports all values to downloadable .txt */ }
function loadSettings() { /* triggers hidden file input click */ }
function handleSettingsFile(event) { /* parses .txt and updates all UI + chart */ }
```

**HTML additions (each GPU page, e.g. `index64.html`):**

```html
<input type="file" id="settingsFileInput" accept=".txt" style="display:none" onchange="handleSettingsFile(event)">
<button class="create-button" onclick="loadSettings();">Load Settings</button>
<button class="create-button" onclick="saveSettings('64');">Save Settings</button>
```

**Shell script addition (`VGtab.sh`):**

```bash
# Save human-readable settings for Load Settings feature
cat /tmp/VGtmp.txt > ~/Desktop/VegaTab_${dev}_settings.txt
```

**Files changed:**

- `Contents/Resources/js/create.js` — Added settingsMap, saveSettings, loadSettings, handleSettingsFile
- `Contents/Resources/index64.html` — Added file input and Save/Load buttons
- `Contents/Resources/index56.html` — Same
- `Contents/Resources/indexFE.html` — Same
- `Contents/Resources/indexFE8G.html` — Same
- `Contents/Resources/index64LC.html` — Same
- `Contents/Resources/indexFELC.html` — Same
- `Contents/Resources/index9100.html` — Same
- `Contents/Resources/index8200.html` — Same
- `Contents/MacOS/VGtab.sh` — Added settings file save on kext build

---

### 3. Vega 64 Tuning — Current Best Settings

After iterative testing, the following settings provide the best balance of performance, power efficiency, and thermal management on our Vega 64:

#### Core Voltage (mV) — Aggressive Undervolt

| P-State | P0  | P1  | P2  | P3   | P4   | P5   | P6   | P7   |
| ------- | --- | --- | --- | ---- | ---- | ---- | ---- | ---- |
| Voltage | 800 | 900 | 950 | 1000 | 1000 | 1000 | 1050 | 1075 |

**Key decision:** P4 and P5 held flat at 1000 mV. This creates a voltage plateau through the mid-range clocks (1200–1401 MHz), significantly reducing power draw and heat without impacting stability. The card spends most of its time in these P-states during gaming.

#### Core Clock (MHz) — Slight Overclock at Top End

| P-State | P0  | P1  | P2   | P3   | P4   | P5   | P6   | P7   |
| ------- | --- | --- | ---- | ---- | ---- | ---- | ---- | ---- |
| Clock   | 852 | 991 | 1084 | 1138 | 1200 | 1401 | 1536 | 1660 |

**Key decision:** P7 boosted to 1660 MHz (stock is ~1630 MHz). Minor but gives extra headroom for peak loads.

#### Memory

| Parameter         | Value    | Notes                                          |
| ----------------- | -------- | ---------------------------------------------- |
| P3 Memory Clock   | 1050 MHz | Above default 945 MHz -- pushes HBM2 bandwidth |
| P3 Memory Voltage | 1350 mV  | Stock value, stable at 1050 MHz                |

#### Fan Settings

| Parameter    | Value    | Notes                                    |
| ------------ | -------- | ---------------------------------------- |
| Idle Speed   | 2200 RPM | Slightly below stock for quieter idle    |
| Target Speed | 3000 RPM | Keeps card cool without excessive noise  |
| Min Speed    | 400 RPM  | Unchanged                                |
| Max Speed    | 4900 RPM | Unchanged                                |
| Sensitivity  | 4836     | Stock value                              |

#### Power & Thermal

| Parameter   | Value | Notes                                             |
| ----------- | ----- | ------------------------------------------------- |
| Target Temp | 70°C  | Aggressive — fans ramp up early                   |
| TDC (Power) | 42%   | Below default 50% — reduces total power envelope  |

**Combined effect:** The undervolt + lower TDC means the card draws significantly less power while maintaining nearly the same clock speeds. The 70°C target with 3000 RPM fan target keeps thermals well controlled.

---

### 4. GitHub Repository Setup

- Initialized git at `~/VGTab-git/` (macOS prevents `.git` creation in `/Applications/`)
- Copied all files from `/Applications/VGTab.app/Contents/`
- Pushed to <https://github.com/yoy123/VegaTab>
- Removed pre-existing files from the remote (IORegistryExplorer.zip, old README)
- Created README.md with project overview, feature docs, and best settings
- Git credentials stored in macOS Keychain (no PAT in repo)

---

### Architecture Reference

```text
VGTab.app
├── Contents/
│   ├── Info.plist                    # App metadata, URL scheme, min macOS
│   ├── PkgInfo                       # APPL package type
│   ├── MacOS/
│   │   ├── applet                    # AppleScript runtime binary
│   │   └── VGtab.sh                  # Builds kext from settings
│   └── Resources/
│       ├── index.html                # GPU model selector
│       ├── index64.html              # Vega 64 config UI
│       ├── index56.html              # Vega 56 config UI
│       ├── indexFE.html              # Vega FE config UI
│       ├── indexFE8G.html            # Vega FE 8G config UI
│       ├── index64LC.html            # Vega 64 LC config UI
│       ├── indexFELC.html            # Vega FE LC config UI
│       ├── index9100.html            # WX 9100 config UI
│       ├── index8200.html            # WX 8200 config UI
│       ├── js/
│       │   ├── create.js             # Save/Load/Create PowerPlay table
│       │   ├── fan.js                # Fan icon animation
│       │   ├── range.js              # Slider ↔ input sync
│       │   ├── temp.js               # Temperature gauge display
│       │   ├── Chart.min.js          # Chart.js library
│       │   ├── chartjs-plugin-annotation.min.js
│       │   ├── jquery-3.3.1.min.js
│       │   └── prefixfree.min.js
│       ├── css/
│       │   ├── main.css
│       │   └── style.css
│       ├── img/fan.svg
│       ├── Scripts/main.scpt         # AppleScript: launches browser + handles vgtab:// URL
│       └── description.rtfd/TXT.rtf
```

**Data flow:**

1. User adjusts settings in HTML/JS GUI
2. "Build Powerplay Table" encodes all values as base64 and triggers `vgtab://` URL
3. AppleScript catches URL, passes base64 payload to `VGtab.sh`
4. Shell script decodes settings, patches hex values into GPU-specific binary template
5. Binary injected into AMD kext plist via `PlistBuddy`
6. Output: `VegaTab_<GPU>.kext` on Desktop, ready to load
