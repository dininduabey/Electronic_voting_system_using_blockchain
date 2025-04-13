export function toBytes32(str) {
    const buff = Buffer.alloc(32); // Create a 32-byte buffer
    buff.write(str, 'utf-8'); // Write string into buffer
    return '0x' + buff.toString('hex'); // Convert to hex with '0x' prefix
  }