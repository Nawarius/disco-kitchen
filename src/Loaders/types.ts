
export interface ILoaderBinUploadData {
    indices: ArrayBuffer
    positions: ArrayBuffer,
    normals: ArrayBuffer,
    uvs: ArrayBuffer
}

export interface ILoaderRootObservers {
    onMeshLoading: Set<any>,
    onMeshUploaded: Set<any>,
}