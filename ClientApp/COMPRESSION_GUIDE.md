# Image Compression Guide

## ✅ Compress Images in: `src/assets/` (SOURCE FOLDER)

## ❌ DO NOT compress: `dist/` folder (it gets regenerated)

---

## 📋 Step-by-Step Process

### Step 1: Compress Images in `src/assets/`

Use these tools:
- **TinyPNG.com** (free, web-based) - for PNG/JPG
- **EZGIF.com** (free) - for GIF files
- **Squoosh.app** (Google's tool) - for all formats

### Step 2: Replace Original Files

After compression, **replace the original files** in `src/assets/` with the compressed versions.

### Step 3: Rebuild

```bash
npm run build
```

This will regenerate the `dist/` folder with your compressed images.

### Step 4: Deploy

Deploy the new `dist/` folder to your live website.

---

## 🎯 Priority List (Compress in this order)

### 🔴 CRITICAL (Do First)

1. **`src/assets/homeheroimg.gif`**
   - Current: 34.96 MB
   - Target: < 5 MB
   - Tool: EZGIF.com or convert to MP4 video

2. **`src/assets/3D/` folder** (all 9 files)
   - `boll_1_flip1.png` (8.45 MB)
   - `boll_1_flip2.png` (9.52 MB)
   - `boll_1_fip3.png` (7.65 MB)
   - `boll_2_flip1.png` (8.94 MB)
   - `boll_2_flip2.png` (7.16 MB)
   - `boll_3_flip1.png` (7.48 MB)
   - `boll_3_flip2.png` (7.33 MB)
   - `boll_4_flip1.png` (8.44 MB)
   - `boll_4_flip2.png` (8.33 MB)
   - Target: 500KB - 1MB each
   - Tool: TinyPNG.com

### 🟠 HIGH PRIORITY

3. **`src/assets/service_page/` folder**
   - `sf_mission.png` (6.44 MB)
   - `Businessvaluations.png` (6.57 MB)
   - `Transaction_services.png` (7.22 MB)
   - `Risk_Advisory.png` (3.59 MB)
   - `Merges_acquisition.png` (3.08 MB)
   - Target: 500KB - 1MB each
   - Tool: TinyPNG.com

### 🟡 MEDIUM PRIORITY

4. **Large background/content images**
   - `src/assets/our-mission.jpg` (4.12 MB)
   - `src/assets/Contact_page/sifamap.png` (3.68 MB)
   - `src/assets/insight_page/article2img.jpg` (2.69 MB)
   - `src/assets/service_page/Information-Technology.jpg` (2.34 MB)
   - `src/assets/service_page/people_organization.png` (2.19 MB)
   - `src/assets/insight_page/article1img.jpg` (1.92 MB)
   - `src/assets/Contact_page/herobackgroundimg.png` (1.63 MB)
   - `src/assets/service_page/herobackground.png` (1.61 MB)
   - `src/assets/Rectangle21.png` (1.30 MB)
   - `src/assets/Rectangle_4525.png` (1.24 MB)
   - `src/assets/trusted-by-leader.jpg` (1.21 MB)
   - Target: 200KB - 500KB each
   - Tool: TinyPNG.com

---

## 🛠️ Quick Compression Commands (Optional)

If you have ImageMagick or similar tools installed:

```bash
# Compress PNG (example)
magick convert input.png -quality 85 -strip output.png

# Compress JPG
magick convert input.jpg -quality 85 -strip output.jpg
```

---

## ⚠️ Important Notes

1. **Always keep backups** of original images before compressing
2. **Test visually** - make sure compressed images still look good
3. **Replace files in `src/assets/`** - not in `dist/`
4. **Rebuild after compression** - run `npm run build`
5. **Check file sizes** - verify they're actually smaller after compression

---

## 📊 Expected Results

After compressing all images:
- **Before**: ~140 MB total
- **After**: ~15-20 MB total
- **Reduction**: 85-90%
- **Load time improvement**: 5-10x faster!

