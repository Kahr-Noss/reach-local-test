import request from 'request-promise';


export const actionsTypes = {
  ADD_COMPANY: 'ADD_COMPANY',
  REMOVE_COMPANY: 'REMOVE_COMPANY',
  CHANGE_DATE: 'CHANGE_DATE',
  LOAD_COMPANY_DATA: 'LOAD_COMPANY_DATA',
  CLEAR_COMPANY_DATA: 'CLEAR_COMPANY_DATA',
  SHOW_ERROR: 'SHOW_ERROR'
}

// adding a new company code to the displayed list
function addCompany(code, startDate, endDate) {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.ADD_COMPANY,
      code
    });
    dispatch(loadCompanyData(code, startDate, endDate));
  };
}

// getting data for from a certain company for the specified period
function loadCompanyData(code, startDate, endDate) {
  return (dispatch) => {
    dispatch({ type: actionsTypes.ADD_COMPANY, code }); // this reset the values and display them as loading
    return request(`https://financialmodelingprep.com/api/v3/historical-price-full/${encodeURI(code)}?from=${startDate.format('YYYY-MM-DD')}&to=${endDate.format('YYYY-MM-DD')}`)
      .then((data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.Error) {
          // if the company is not found
          dispatch({ type: actionsTypes.SHOW_ERROR, category: 'company', msg: `Company code not found, please chack that ${code} is a valid company code.`, code });
        } else {
          // keep only relevant data
          const result = {          
            name: parsedData.symbol,
            status: 'complete',
            values: parsedData.historical.map((day) => ({
              date: day.date,
              close: day.close
            }))
          };
          dispatch({ type: actionsTypes.LOAD_COMPANY_DATA, code, result });
        }
      })
      .catch((err) => {
        // website error
        dispatch({ type: actionsTypes.SHOW_ERROR,  msg: 'API is down, please retry later.' });
      });
  }
}

// remove a company from displayed list
function removeCompany(code) {
  return {
    type: actionsTypes.REMOVE_COMPANY,
    code
  }
}

// updating one of the two dates
function changeDate(key, date) {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.CHANGE_DATE,
      key,
      date
    });
  };
}

export const actions = {
  addCompany,
  removeCompany,
  changeDate,
  loadCompanyData,
}