import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection />
    </div>
  );
}
