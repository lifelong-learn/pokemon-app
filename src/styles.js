import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: '0px auto',
    padding: '20px 0px',
    width: '40px'
  },
  searchContainer: {
    display: 'flex',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    padding: '5px'
  },
  searchIcon: {
    alignSelf: 'flex-end',
    paddingBottom: '3px'
  },
  cardGrid: {
    margin: '20px auto',
    padding: '20px 0px'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: '144px',
    width: '144px',
    margin: '0px auto'
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export { useStyles as default };