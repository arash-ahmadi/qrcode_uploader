import { createStyles } from '@mui/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        page: {
            minWidth: '330px',
            minHeight: '82vh',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            
        },
        twobuttons: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        imageItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifySelf: 'flex-end',
            marginBottom: '40px'
            // margin- left: 10px;
        },
        textWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px'
        },

        imageButtonWrapper: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '10px'
        },

    }))

export default useStyles;