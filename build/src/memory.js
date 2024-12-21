export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0';
    }
    else {
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]);
    }
}
export const getObjectSize = (object) => formatBytes(Buffer.from(JSON.stringify(object)).byteLength);
