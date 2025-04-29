import { Photo } from "../types";
import Folder from "./Folder";

const CLASSES = [0, 1, 2, 3, 4, 5];

type Props = {
  photos: Photo[];
};

const Photos: React.FC<Props> = ({ photos }) => (
  <div className="flex flex-col gap-4 m-8">
    {CLASSES.map(classNumber =>
      photos.some(photo => photo.class === classNumber) ? (
        <Folder
          key={classNumber}
          classNumber={classNumber}
          photos={photos
            .filter(photo => photo.class === classNumber)
            .map(photo => photo.name)}
        />
      ) : null
    )}
  </div>
);

export default Photos;
