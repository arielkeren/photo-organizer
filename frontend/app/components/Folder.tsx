import Image from "next/image";

type Props = {
  classNumber: number;
  photos: string[];
};

const CLASS_NAMES = ["Lior", "Tal", "Rotem", "Ofri", "Inbar", "Other"];

const Folder: React.FC<Props> = ({ classNumber, photos }) => (
  <div>
    <h2 className="font-bold uppercase">{CLASS_NAMES[classNumber]}</h2>
    <div className="flex flex-wrap gap-2">
      {photos.map(photo => (
        <Image
          className="rounded-xl shadow-2xl"
          key={photo}
          src={`/uploads/${photo}`}
          height={200}
          width={200}
          alt=""
          priority
        />
      ))}
    </div>
  </div>
);

export default Folder;
