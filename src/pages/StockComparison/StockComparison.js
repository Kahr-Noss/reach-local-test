import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";

import { actions } from '../../redux/StockComparisonActions';

import LineChart from '../../components/LineChart/LineChart';

import './StockComparison.css';
import "react-datepicker/dist/react-datepicker.css";


class StockComparison extends Component {
  constructor(props) {
    super(props);
    this.state = { inputedCompany: '' };
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
    // update the company the user is typing
    this.setState({ inputedCompany: value.toUpperCase() });
  }

  render() {
    return (
      <div className="stocks-comparison-wrapper">

        <div className="left-menu">
          <div className='text'>COMPANIES</div>

          <div className="left-menu-input-wrapper">
            <input className='left-menu-input' value={this.state.inputedCompany} onChange={(e) => this.changeSelectedCompany(e.target.value)} />
            <button className="btn" onClick={() => {
              if (this.state.inputedCompany) {
                this.props.onAddCompany(this.state.inputedCompany, this.props.startDate, this.props.endDate);
              }
              this.changeSelectedCompany('');
            }}>ADD</button>
          </div>

          <div className="left-menu-companies-wrapper">
            {Object.values(this.props.companies).map((company) => (
              <div className="company-wrapper" key={company.name}>
                {company.name}
                {company.status !== 'complete' ? <span className="loading-txt">{company.status}</span> : null}
                <button className="remove-btn" onClick={() => this.props.onCompanyRemove(company.name)}>X</button>
              </div>
            ))}
          </div>
          {this.props.error ? <span className="error-msg" >{this.props.error}</span> : null}
        </div>


        <div className="right-content">
          <div className='text'>Select the date range:</div>
          <div className="date-selection-wrapper">
            <div className='label'>FROM</div>
            <DatePicker
              selected={this.props.startDate.toDate()}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => this.props.onDateChange('startDate', moment(date))}
              maxDate={this.props.endDate.toDate()}
            />
            <div className='label'>TO</div>
            <DatePicker
              selected={this.props.endDate.toDate()}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => this.props.onDateChange('endDate', moment(date))}
              minDate={this.props.startDate.toDate()}
            />
            <button className="load-btn btn" onClick={this.reloadData}>LOAD</button>
          </div>
          <LineChart
            data={this.props.companies}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  startDate: state.stockComparison.startDate,
  endDate: state.stockComparison.endDate,
  companies: state.stockComparison.companies,
  error: state.stockComparison.error,
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