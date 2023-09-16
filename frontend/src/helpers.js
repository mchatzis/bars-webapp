import { GetObjectCommand } from "@aws-sdk/client-s3";


export function concatArrayBuffers(a1, a2){
    var tmp = new Uint8Array(a1.length + a2.length)
    tmp.set(a1)
    tmp.set(a2,a1.length)
    return tmp
}

export async function readStream(readableStream){
    const reader = readableStream.getReader();
    var chunks = new Uint8Array();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks = concatArrayBuffers(chunks, value)
    }
    return chunks
}

export async function getImage(client, file){
    const cmd = new GetObjectCommand({ Bucket: client.s3_bucket, Key: file })
    const stream = await client.send(cmd)
    const buffered = await readStream(stream.Body)
    const url = URL.createObjectURL(new Blob([buffered]))

    return url
}