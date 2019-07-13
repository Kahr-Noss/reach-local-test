import request from 'request-promise';


export const actionsTypes = {
  ADD_COMPANY: 'ADD_COMPANY',
  REMOVE_COMPANY: 'REMOVE_COMPANY',
  CHANGE_DATE: 'CHANGE_DATE',
  LOAD_COMPANY_DATA: 'LOAD_COMPANY_DATA',
  CLEAR_COMPANY_DATA: 'CLEAR_COMPANY_DATA',

}

function addCompany(code, startDate, endDate) {
  return (dispatch) => {
    dispatch({
      type: actionsTypes.ADD_COMPANY,
      code
    });
    dispatch(loadCompanyData(code, startDate, endDate));
  };
}

function loadCompanyData(code, startDate, endDate) {
  return (dispatch) => {
    dispatch({ type: actionsTypes.ADD_COMPANY, code }); // this reset the values and display them as loading
    return request(`https://financialmodelingprep.com/api/v3/historical-price-full/${code}?from=${startDate.format('YYYY-MM-DD')}&to=${endDate.format('YYYY-MM-DD')}`)
      .then((data) => {
        // keep only relevant data
        const parsedData = JSON.parse(data);
        const result = {          
          name: parsedData.symbol,
          isLoading: false,
          values: parsedData.historical.map((day) => ({
            date: day.date,
            close: day.close
          }))
        };
        dispatch({ type: actionsTypes.LOAD_COMPANY_DATA, code, result });
      })
      .catch((err) => {
        // TODO
        // this.setState({ error: err, isLoading: false });
      });
  }
}

function removeCompany(code) {
  return {
    type: actionsTypes.REMOVE_COMPANY,
    code
  }
}

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