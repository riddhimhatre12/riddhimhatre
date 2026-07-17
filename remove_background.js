import { Jimp } from 'jimp';

async function main() {
  const inputPath = 'c:/Users/admin/OneDrive/Desktop/ridhiportfolio/ridhiportfolio/src/assets/portrait_riddhi_cutout.png';
  const outputPath = 'c:/Users/admin/OneDrive/Desktop/ridhiportfolio/ridhiportfolio/src/assets/portrait_riddhi_cutout.png';

  console.log('Loading image from:', inputPath);
  const image = await Jimp.read(inputPath);
  const width = image.width;
  const height = image.height;
  
  console.log(`Image loaded. Dimensions: ${width}x${height}`);

  // Sample top-left corner background colors
  const bgColors = new Set();
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 20; y++) {
      const color = image.getPixelColor(x, y);
      bgColors.add(color);
    }
  }

  console.log('Detected background colors:', Array.from(bgColors).map(c => c.toString(16)));

  // Flood fill algorithm
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Add all edge pixels as starting points
  for (let x = 0; x < width; x++) {
    queue.push([x, 0]);
    visited[0 * width + x] = 1;
    
    queue.push([x, height - 1]);
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push([0, y]);
    visited[y * width + 0] = 1;
    
    queue.push([width - 1, y]);
    visited[y * width + (width - 1)] = 1;
  }

  // Flood fill queue processing
  let count = 0;
  while (queue.length > 0) {
    const [cx, cy] = queue.shift();
    const currentColor = image.getPixelColor(cx, cy);

    // Check if color matches background
    const r = (currentColor >> 24) & 0xff;
    const g = (currentColor >> 16) & 0xff;
    const b = (currentColor >> 8) & 0xff;
    const a = currentColor & 0xff;

    // Checkerboard cells are white or grey (neutral)
    const isNeutral = Math.abs(r - g) < 12 && Math.abs(g - b) < 12 && Math.abs(r - b) < 12 && r > 160;
    const isBgColor = bgColors.has(currentColor);

    if (isNeutral || isBgColor) {
      // Set to transparent black
      image.setPixelColor(0, cx, cy);
      count++;

      // Check neighbors
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const idx = ny * width + nx;
          if (visited[idx] === 0) {
            visited[idx] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }

  console.log(`Made ${count} background pixels transparent.`);
  await image.write(outputPath);
  console.log('Saved transparent image to:', outputPath);
}

main().catch(err => {
  console.error('Error processing image:', err);
});
