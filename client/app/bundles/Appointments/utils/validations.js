import moment from 'moment'

export const validations = {
  checkMinLength: (text, mingLength) => {
    let errorMsg = '';
    if (text.trim().length < mingLength){
      errorMsg = `length should be at least ${mingLength} characters`;
    }
    return errorMsg;
  },
  checkAptTime: (time) => {
    let errorMsg = ''
    const valid = moment(time).isValid();
    const after = moment(time).isAfter();
    if (!(valid && after )) {
      errorMsg = 'time shoud be in the future';
    }
    return errorMsg;
  }
}
