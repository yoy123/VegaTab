# VGTab (VegaTab)

A macOS app for generating and applying custom AMD Vega Soft PowerPlay Tables. Tune your GPU's core clocks, core voltages, memory clocks, memory voltages, fan curves, target temperature, and TDC — all through a simple GUI with sliders and charts.

Originally created by [lihaoyun6](https://github.com/lihaoyun6/VGTab), this fork has been modified to run on **macOS 15.1.1 (Sequoia)** and later, with additional quality-of-life features for iterative tuning.

## Supported GPUs

- Vega 64
- Vega 56
- Vega Frontier Edition (FE)
- Vega FE 8G
- Vega 64 Liquid Cooling
- Vega FE Liquid Cooling
- WX 9100
- WX 8200

## What's Changed

### macOS 15.1.1+ Compatibility

The minimum system version has been updated to **macOS 15.1** to support modern Sequoia builds. The kext generation and plist patching pipeline has been verified to work on this version.

### Save & Load Settings

To make trial-and-error tuning less painful, **Save Settings** and **Load Settings** buttons have been added to each GPU's configuration page:

- **Save Settings** — Exports all current slider/input values (clocks, voltages, fan speeds, temperature, TDC) to a human-readable `.txt` file (`VegaTab_<GPU>_settings.txt`). This file is downloaded via the browser and also saved to your Desktop when building a PowerPlay table.
- **Load Settings** — Opens a file picker to import a previously saved `.txt` settings file. All sliders, inputs, and the chart update instantly to reflect the loaded values.

This means you can:

1. Configure your settings and **Save** them before applying.
2. Build and test the PowerPlay table.
3. If something isn't right, tweak values and save a new version.
4. Easily **Load** any previous configuration to compare or roll back.

No more manually re-entering dozens of values between attempts.

## How to Use

1. Open **VGTab.app**.
2. Select your GPU model.
3. Adjust core clock, core voltage, memory clock, memory voltage, fan, and power settings using the sliders or numeric inputs.
4. Optionally **Save Settings** to preserve your configuration.
5. Click **Build Powerplay Table** to generate a custom kext (`VegaTab_<GPU>.kext`) on your Desktop.
6. Load the kext using your preferred method (e.g., OpenCore, or manually via `kextload`).

## My Current Best Settings (Vega 64)

These are the settings I'm currently running on my Vega 64. They prioritize stability with a moderate undervolt and slightly boosted top-end clocks:

| Parameter | Value |
| --- | --- |
| **Core Voltage (P0–P7)** | 800, 900, 950, 1000, 1000, 1000, 1050, 1075 mV |
| **Core Clock (P0–P7)** | 852, 991, 1084, 1138, 1200, 1401, 1536, 1660 MHz |
| **Memory Voltage (P3)** | 1350 mV |
| **Memory Clock (P0–P3)** | 167, 500, 800, 1050 MHz |
| **Fan Idle Speed** | 2200 RPM |
| **Fan Target Speed** | 3000 RPM |
| **Fan Min Speed** | 400 RPM |
| **Fan Max Speed** | 4900 RPM |
| **Fan Sensitivity** | 4836 |
| **Target Temperature** | 70°C |
| **TDC (Power)** | 42% |

### Key Tuning Notes

- **P4–P5 voltages held at 1000 mV** — flat voltage curve through the mid-range clocks reduces power draw and heat without sacrificing stability.
- **P7 clock boosted to 1660 MHz** — slightly above stock for extra performance headroom.
- **P3 memory clock raised to 1050 MHz** — pushes HBM2 bandwidth above the default 945 MHz.
- **TDC at 42%** — lower than the default 50%, reducing total power consumption and thermals while keeping clocks sustainable under load.
- **Target temp 70°C** with a **3000 RPM target fan speed** — keeps the card cool without excessive noise.

> **Disclaimer:** These settings work for my specific card. Silicon lottery varies — start conservative and test stability before daily driving. Always keep a backup of your working settings using the Save feature.

## Credits

- Original VGTab by [lihaoyun6](https://github.com/lihaoyun6/VGTab)
- Uses [Chart.js](https://www.chartjs.org/) for the interactive voltage/clock graph
