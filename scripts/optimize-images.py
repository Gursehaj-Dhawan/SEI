from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent
IMAGE_DIR = ROOT / "images"
SOURCES = (
    "Bright-Round-Bars.png",
    "Built-Strong.png",
    "Diagonal-Cutting-Bright-Square-Bars.png",
    "Flat-Bright-Bars.png",
    "Precision-in-every-measurement.png",
)


for filename in SOURCES:
    source = IMAGE_DIR / filename
    destination = source.with_suffix(".webp")
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=82, method=6)
    print(f"{source.name} -> {destination.name} ({destination.stat().st_size:,} bytes)")
