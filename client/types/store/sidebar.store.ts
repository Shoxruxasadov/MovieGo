export default interface SidebarStore {
  position: number;
  setPosition: (position: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  positionLng: number;
  setPositionLng: (positionLng: number) => void;
}