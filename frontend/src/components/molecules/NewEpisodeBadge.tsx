import Chip from "../atoms/Chip";

const NewEpisodeBadge = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full p-3">
      <Chip value="Episode Baru" variant="primary" size="small" className="w-fit px-2! py-1! font-semibold" />
    </div>
  );
};

export default NewEpisodeBadge;
