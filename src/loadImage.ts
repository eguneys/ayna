export function loadImage(path: string) {
  return new Promise<HTMLImageElement>((resolve: any) => {
    let img = new Image();
    img.src = path;
    img.onload = () => resolve(img);
  });
}
