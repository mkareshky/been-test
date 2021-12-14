import { useStyles } from "../../common/materialUiStyles";

export const TextError = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.dangerAlarm} >
      {children}
    </div>
  );
};
