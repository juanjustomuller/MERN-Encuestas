import { IconButton, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"


const Notificaciones = (props) => {
  return (
    <Snackbar
    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
    open={props.switcher}
    onClose={props.close}
    autoHideDuration={3000}
    action={[
      <IconButton aria-label="Cerrar" color="inherit" onClick={props.close}>
        X
      </IconButton>
    ]}
    >
    
    <Alert onClose={props.close} severity={props.nottype}>
      {props.msg}
    </Alert>
    </Snackbar>
  )
}

export default Notificaciones

