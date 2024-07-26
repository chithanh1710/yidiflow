import style from "./BounceLoading.module.css";
export default function BounceLoading() {
  return (
    <div className={style["bounce-loading"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
