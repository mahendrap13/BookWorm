import multer from "multer";
import path from "path";
import fs from "fs";

export const MulterFun = (dist) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (fs.existsSync(dist)) {
        cb(null, dist);
      } else {
        fs.mkdirSync(dist, true);
        cb(null, dist);
      }
    },
    filename: function (req, file, cb) {
      const imgname = file.originalname;
      const imgArr = imgname.split(".");
      imgArr.pop();
      const imgExt = path.extname(imgname);
      const imgName = imgArr.join(".") + "-" + Date.now() + imgExt;
      cb(null, imgName);
    },
  });
  return multer({ storage: storage });
};
