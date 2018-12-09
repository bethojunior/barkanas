class FileUpload {
    /**
     *
     * @param path {String}
     * @returns {Promise<any>}
     */

     static getFile(path) {
        return new Promise((resolve) => {
            window.resolveLocalFileSystemURL(path, function (fileEntry) {
                fileEntry.file(function (file) {
                    resolve(file);
                }, function (e) {
                    console.log('error getting file', e);
                });
            }, function (e) {
                console.log('Error resolving fs url', e);
            });
        });
    }


    static async prepare(file){
        return await new Promise(resolve => {
            let reader = new FileReader();
            reader.onloadend = (fileReadResult) => {
                let data = new Uint8Array(fileReadResult.target.result);
                resolve({data : new Blob([data],{type: "image/jpeg"}), name : file.name});
            };
            reader.readAsArrayBuffer(file)
        });
    }
}