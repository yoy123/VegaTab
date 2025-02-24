# VegaTab
VegaTab for newer OS's

I do not take credit for creating VegaTab. I am unsure of the original creator. It was built for OSX 10.13 and I needed it to work for OSX 15.1.1
I modified the code just a smidge to get passed the OS restriction errors and it works perfectly. 

1. Open the app and it will open a GUI in Safari broswer.
2. Select the graphics card you are trying to modify
3. Make your voltage and Clock changes as desired and then click Build Power Play Table.
4. It will then save 2 files to your desktop.
5. 1 will say VegaTab_64.kext, the other will say VegaTab_64_data.txt
6. The txt file is supposed to be used to build an SSDT. I have not experimented with this.
7. The kext file works perfectly with OpenCore.
8. Simply add the Kext file to your Opencore Kext folder and add then update your config file...
9. This kext simply ammends the AMD kext file in /System/LibraryExtensions. It doesnt require any rom flashing etc...
10. To test if it worked, obviously you could bench test and see if performance went up or down.
11. But secondly, you can run IORegistryExplorer.app and find the card info and you will see the modifications
