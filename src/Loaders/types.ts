
export interface ILoaderBinUploadData {
    indices: ArrayBuffer
    positions: ArrayBuffer,
    normals: ArrayBuffer,
    uvs: ArrayBuffer
}

export interface ILoaderRootObservers {
    onMeshUploaded: Set<any>,
}