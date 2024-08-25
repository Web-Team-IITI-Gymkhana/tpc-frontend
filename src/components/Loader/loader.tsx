import styles from "./loader.module.css";
import { CircularProgress } from "@mui/material";
const Loader = () => {
  return (
    // < div className="h-screen w-full flex justify-center items-center">
    //     <CircularProgress />
    //   </div>

    <div className={styles.loader}>
      <figure className={styles.iconLoaderProgress}>
        <svg
          className={styles.iconLoaderProgressFirst}
          width="240"
          height="240"
        >
          <circle cx="120" cy="120" r="100"></circle>
        </svg>

        <svg
          className={styles.iconLoaderProgressSecond}
          width="240"
          height="240"
        >
          <circle cx="120" cy="120" r="100"></circle>
        </svg>
      </figure>
    </div>
  );
};

export default Loader;
