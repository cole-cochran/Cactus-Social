
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// checkboxes
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// date and time field
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Stack from '@mui/material/Stack';
import MobileTimePicker from '@mui/lab/MobileTimePicker';

import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

// import { CREATE_EVENT } from '../utils/mutations';
//* CREATE_EVENT requires: threadId, title, description, start_date, end_date, start_time, end_time, category, in_person, location, image, and owner and it returns the Event

//! REDIRECT (AFTER SUBMISSION) TO THE EVENT DISPLAY

console.log(`                              ...----....
                         ..-:"''         ''"-..
                      .-'                      '-.
                    .'              .     .       '.
                  .'   .          .    .      .    .''.
                .'  .    .       .   .   .     .   . ..:.
              .' .   . .  .       .   .   ..  .   . ....::.
             ..   .   .      .  .    .     .  ..  . ....:IA.
            .:  .   .    .    .  .  .    .. .  .. .. ....:IA.
           .: .   .   ..   .    .     . . .. . ... ....:.:VHA.
           '..  .  .. .   .       .  . .. . .. . .....:.::IHHB.
          .:. .  . .  . .   .  .  . . . ...:.:... .......:HIHMM.
         .:.... .   . ."::"'.. .   .  . .:.:.:II;,. .. ..:IHIMMA
         ':.:..  ..::IHHHHHI::. . .  ...:.::::.,,,. . ....VIMMHM
        .:::I. .AHHHHHHHHHHAI::. .:...,:IIHHHHHHMMMHHL:. . VMMMM
       .:.:V.:IVHHHHHHHMHMHHH::..:" .:HIHHHHHHHHHHHHHMHHA. .VMMM.
       :..V.:IVHHHHHMMHHHHHHHB... . .:VPHHMHHHMMHHHHHHHHHAI.:VMMI
       ::V..:VIHHHHHHMMMHHHHHH. .   .I":IIMHHMMHHHHHHHHHHHAPI:WMM
       ::". .:.HHHHHHHHMMHHHHHI.  . .:..I:MHMMHHHHHHHHHMHV:':H:WM
       :: . :.::IIHHHHHHMMHHHHV  .ABA.:.:IMHMHMMMHMHHHHV:'. .IHWW
       '.  ..:..:.:IHHHHHMMHV" .AVMHMA.:.'VHMMMMHHHHHV:' .  :IHWV
        :.  .:...:".:.:TPP"   .AVMMHMMA.:. "VMMHHHP.:... .. :IVAI
       .:.   '... .:"'   .   ..HMMMHMMMA::. ."VHHI:::....  .:IHW'
       ...  .  . ..:IIPPIH: ..HMMMI.MMMV:I:.  .:ILLH:.. ...:I:IM
     : .   .'"' .:.V". .. .  :HMMM:IMMMI::I. ..:HHIIPPHI::'.P:HM.
     :.  .  .  .. ..:.. .    :AMMM IMMMM..:...:IV":T::I::.".:IHIMA
     'V:.. .. . .. .  .  .   'VMMV..VMMV :....:V:.:..:....::IHHHMH
       "IHH:.II:.. .:. .  . . . " :HB"" . . ..PI:.::.:::..:IHHMMV"
        :IP""HHII:.  .  .    . . .'V:. . . ..:IH:.:.::IHIHHMMMMM"
        :V:. VIMA:I..  .     .  . .. . .  .:.I:I:..:IHHHHMMHHMMM
        :"VI:.VWMA::. .:      .   .. .:. ..:.I::.:IVHHHMMMHMMMMI
        :."VIIHHMMA:.  .   .   .:  .:.. . .:.II:I:AMMMMMMHMMMMMI
        :..VIHIHMMMI...::.,:.,:!"I:!"I!"I!"V:AI:VAMMMMMMHMMMMMM'
        ':.:HIHIMHHA:"!!"I.:AXXXVVXXXXXXXA:."HPHIMMMMHHMHMMMMMV
          V:H:I:MA:W'I :AXXXIXII:IIIISSSSSSXXA.I.VMMMHMHMMMMMM
            'I::IVA ASSSSXSSSSBBSBMBSSSSSSBBMMMBS.VVMMHIMM'"'
             I:: VPAIMSSSSSSSSSBSSSMMBSSSBBMMMMXXI:MMHIMMI
            .I::. "H:XIIXBBMMMMMMMMMMMMMMMMMBXIXXMMPHIIMM'
            :::I.  ':XSSXXIIIIXSSBMBSSXXXIIIXXSMMAMI:.IMM
            :::I:.  .VSSSSSISISISSSBII:ISSSSBMMB:MI:..:MM
            ::.I:.  ':"SSSSSSSISISSXIIXSSSSBMMB:AHI:..MMM.
            ::.I:. . ..:"BBSSSSSSSSSSSSBBBMMMB:AHHI::.HMMI
            :..::.  . ..::":BBBBBSSBBBMMMB:MMMMHHII::IHHMI
            ':.I:... ....:IHHHHHMMMMMMMMMMMMMMMHHIIIIHMMV"
              "V:. ..:...:.IHHHMMMMMMMMMMMMMMMMHHHMHHMHP'
               ':. .:::.:.::III::IHHHHMMMMMHMHMMHHHHM"
                 "::....::.:::..:..::IIIIIHHHHMMMHHMV"
                   "::.::.. .. .  ...:::IIHHMMMMHMV"
                     "V::... . .I::IHHMMV"'
                       '"VHVHHHAHHHHMMV:"'
`)
console.log("BEWARE, I LIVE!")
console.log("super secret dev link")
console.log("https://www.youtube.com/watch?v=Qi1KebO4bzc")

export default function FullWidthTextField() {

  return (
    <div>
      <Box
        sx={{ width: 500, maxWidth: '100%', m: 2 }}
      >
        <TextField fullWidth label="Title" id="fullWidth" />
      </Box>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          m: 2
        }}
      >
        <TextField fullWidth label="Description" id="fullWidth" />
      </Box>
      {/* checkbox in person */}

      {/* date and time */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}
          sx={{
            width: 500,
            maxWidth: '100%',
            m: 2
          }}>

          <MobileDatePicker
            label="Date mobile"
            inputFormat="MM/dd/yyyy"
            // value={value}
            // onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileTimePicker
            label="For mobile"
            // value={value}
            // onChange={(newValue) => {
            //   setValue(newValue);
            // }}
            renderInput={(params) => <TextField {...params} />}
          />

        </Stack>
        <FormGroup 
        sx={{
    width: 500,
    maxWidth: '100%',
    m: 2
  }}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="In Person" />
        </FormGroup>
      </LocalizationProvider>
    </div>
  );
}
// title, tex input description text input, start date and end date modal, start time end time modal, category text input
// inperson or not (true or false selector or switch) location text input
// image input(empty)







// export default function EventCreation() {
//     const [values, setValues] = React.useState({
//         username: '',
//         first_name: '',
//         last_name: '',
//         email: '',
//         password: '',
//         showPassword: false,
//       });

//       const handleChange = (prop) => (event) => {
//         setValues({ ...values, [prop]: event.target.value });
//       };

//       const handleClickShowPassword = () => {
//         setValues({
//           ...values,
//           showPassword: !values.showPassword,
//         });
//       };

//       const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     }
//   return (

//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>

//       <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
//           <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             type={values.showPassword ? 'text' : 'password'}
//             value={values.password}
//             onChange={handleChange('password')}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   {values.showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>
//         <TextField
//           required
//           id="outlined-required"
//           label="Required"
//           defaultValue="Hello World"
//         />
//         <TextField
//           disabled
//           id="outlined-disabled"
//           label="Disabled"
//           defaultValue="Hello World"
//         />
//         <TextField
//           id="outlined-password-input"
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//         />
//         <TextField
//           id="outlined-read-only-input"
//           label="Read Only"
//           defaultValue="Hello World"
//           InputProps={{
//             readOnly: true,
//           }}
//         />
//         <TextField
//           id="outlined-number"
//           label="Number"
//           type="number"
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField id="outlined-search" label="Search field" type="search" />
//         <TextField
//           id="outlined-helperText"
//           label="Helper text"
//           defaultValue="Default Value"
//           helperText="Some important text"
//         />
//       </div>





{/* // title, tex input description text input, start date and end date modal, start time end time modal, category text input
// inperson or not (true or false selector or switch) location text input
// image input(empty) */}




