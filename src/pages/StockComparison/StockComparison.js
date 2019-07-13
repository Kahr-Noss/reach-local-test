import React, { Component } from 'react';
import request from 'request-promise';
import moment from 'moment';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";

import { actions } from './actions';

import LineChart from '../../components/LineChart/LineChart';
import companiesList from '../../data/companyList.json';

import './StockComparison.css';
import "react-datepicker/dist/react-datepicker.css";


class StockComparison extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCompany: '' };
  }


  componentDidMount() {
    // load those 3 companies at launch
    this.props.onAddCompany('AAPL', this.props.startDate, this.props.endDate);
    this.props.onAddCompany('GOOGL', this.props.startDate, this.props.endDate);
    this.props.onAddCompany('AMZN', this.props.startDate, this.props.endDate);
  }

  reloadData = () => {
    // get the data for all the displayed companies after we changes the dates
    Object.keys(this.props.companies).forEach((company) => this.props.onLoadCompanyData(company, this.props.startDate, this.props.endDate));
  }

  changeSelectedCompany = (value) => {
    this.setState({ selectedCompany: value });
  }

  render() {
    console.log(this.props)
    return (
      <div className="stocks-comparison-wrapper">
        <DatePicker
          selected={this.props.startDate.toDate()}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => this.props.onDateChange('startDate', moment(date))}
          maxDate={this.props.endDate.toDate()}
        />
        <DatePicker
          selected={this.props.endDate.toDate()}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => this.props.onDateChange('endDate', moment(date))}
          minDate={this.props.startDate.toDate()}
        />
        <button onClick={this.reloadData}>LOAD</button>
        <LineChart
          data={Object.values(this.props.companies)}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />
        {Object.values(this.props.companies).map((company) => (
          <div className="company-wrapper" key={company.name}>
            <button className="remove-btn" onClick={() => this.props.onCompanyRemove(company.name)}>X</button>
            {company.name}
            {company.isLoading ? <span className="loading-txt">Loading...</span> : null}
          </div>
        ))}

        <select
          className="add-company-select"
          value={this.state.selectedCompany}
          onChange={(e) => this.changeSelectedCompany(e.target.value)}
        >
           <option  value="" disabled>Select a company to add...</option>
          {companiesList.map((company) => <option key={company} value={company}>{company}</option>)}
        </select>
        <button className="add-btn" onClick={() => {
          if (this.state.selectedCompany){
            this.props.onAddCompany(this.state.selectedCompany, this.props.startDate, this.props.endDate);
          }
          this.changeSelectedCompany('');
        }}>ADD</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  startDate: state.stockComparison.startDate,
  endDate: state.stockComparison.endDate,
  companies: state.stockComparison.companies,
});

const mapDispatchToProps = (dispatch) => ({
  onDateChange: (key, date) => { dispatch(actions.changeDate(key, date)) },
  onAddCompany: (code, startDate, endDate) => { dispatch(actions.addCompany(code, startDate, endDate)) },
  onLoadCompanyData: (code, startDate, endDate) => { dispatch(actions.loadCompanyData(code, startDate, endDate)) },
  onCompanyRemove: (code) => { dispatch(actions.removeCompany(code)) },
});


const ConnectedStockComparison = connect(
  mapStateToProps,
  mapDispatchToProps
)(StockComparison);


export default ConnectedStockComparison;