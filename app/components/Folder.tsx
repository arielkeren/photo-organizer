import Image from "next/image";

type Props = {
  classNumber: number;
  photos: string[];
};

const Folder: React.FC<Props> = ({ classNumber, photos }) => (
  <div>
    <h2 className="font-bold uppercase">Class {classNumber}</h2>
    <div className="flex flex-wrap gap-2">
      {photos.map(photo => (
        <Image
          key={photo}
          src={`/uploads/${photo}`}
          height={200}
          width={200}
          alt=""
        />
      ))}
    </div>
  </div>
);

export default Folder;
