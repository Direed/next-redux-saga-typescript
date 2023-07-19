import { PictureOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import { useMemoState } from 'hooks';

import styles from './ImgUpload.module.scss';

interface IImgUpload {
  onUpload: (file: RcFile, result: string) => void;
  image?: string;
}

export const ImgUpload = ({ onUpload, image }: IImgUpload) => {
  const [img, setImg] = useMemoState<string | null>(null);

  const handleLoadImage = (file: RcFile) => {
    const reader = new FileReader();

    if (file.size / 1024 > 10000) {
      message.error('Please upload a smaller image, max size 1Mb');
    } else if (!(/^image\/(png|jpe?g|tiff|bmp)$/).test(file.type)) {
      message.error('Invalid image format, just: png, jpeg, tiff, bmp');
    } else {
      reader.addEventListener('load', event => {
        onUpload(file, event?.target?.result as string);
        setImg(event?.target?.result as string);
      });
    }

    reader.readAsDataURL(file);

    return true;
  };

  const getContent = () => {
    if(image) {
      return (
        <img
          className={styles.image}
          src={img || image}
        />
      );
    }

    return (
      <div className={styles.addPhoto}>
        <PictureOutlined style={{ fontSize: 35 }} />
        Add a photo
      </div>
    );
  };

  return (
    <Upload
      customRequest={() => null}
      accept='.png,.jpg,.jpeg,.tiff,.bmp'
      showUploadList={false}
      beforeUpload={handleLoadImage as () => boolean}
    >
      {getContent()}
    </Upload>
  );
};