import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    dangerAlarm: {
      paddingLeft: 8,
      paddingRight: 8,
      color: "red",
    },
  }),
);
