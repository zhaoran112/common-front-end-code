document.getElementById('openFilePicker').addEventListener('click', async () => {
    const directoryHandle = await window.showDirectoryPicker();
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        console.log('[ file ] >', file)
        // const contents = await file.text();
        // console.log(`File: ${entry.name}, Contents: ${contents}`);
      }
    }
  });
