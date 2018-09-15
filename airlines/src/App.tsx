import TextFields from '@material-ui/core/TextField';
import * as React from "react";
// import Loader from 'react-loader-spinner'
import ResultComponent from './components/ResultComponent';
import './App.css';

interface ISearchState{
  searchTerm : any,
  error : any,

  found: any,
  imageLink: any;
  airlineName : any,
  airlineCode : any,
  country: any,
  isInternational: any,
  routes: any,
  totalAircraft: any,
  avgFleetAge: any,
  noOldFleet: any,
  accidents: any,
  fatalAccidents: any
}

export default class App extends React.Component<{}, ISearchState> {

  constructor(props: any){
    super(props)
    this.state = {
      error: "0",
      searchTerm: "",
      found: "0",
      imageLink: "http://www.samuitimes.com/wp-content/uploads/2014/04/Thai-airways-logo.jpg",
      airlineName: "Thai airways inter",
      airlineCode: "THA",
      country: "Thailand",
      isInternational: "YES",
      routes: "34234",
      totalAircraft: "34123",
      avgFleetAge: "33932",
      noOldFleet: "1321",
      accidents: "3",
      fatalAccidents: "3"
    }
    this.onSearch = this.onSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // public componentDidUpdate()
  // {
  //   this.searchImage(this.state.airlineName + " logo");
  // }

  public render() {
    return (
      <div className="container-fluid">
        <div className="centreText">
          {/* React components must have a wrapper node/element */}
          <p>Is this airline safe?</p>
          <form onSubmit={this.onSearch}>
              <TextFields autoComplete = "off" type="text" onChange = {this.handleChange} name="airline" placeholder="airline name"/>
              <input type="submit" value="Search" />
          </form>
          {this.state.error === "1" ? <p> Invalid code, please check your airline code and try again </p> : <p>ICAO Operator code is a 3-letter code</p>}
        </div>
        <div className="mainResult">
         {this.state.found === "1" ? <ResultComponent 
            airlineName={this.state.airlineName}
            airlineCode={this.state.airlineCode}
            imageLink={this.state.imageLink}
            country={this.state.country}
            isInternational={this.state.isInternational}
            routes = {this.state.routes}
            totalAircraft={this.state.totalAircraft}
            avgFleetAge={this.state.avgFleetAge}
            noOldFleet={this.state.noOldFleet}
            accidents={this.state.accidents}
            fatalAccidents={this.state.fatalAccidents} /> 
            : 
            <ResultComponent airlineName={this.state.airlineName}
            airlineCode={this.state.airlineCode}
            imageLink={this.state.imageLink}
            country={this.state.country}
            isInternational={this.state.isInternational}
            routes = {this.state.routes}
            totalAircraft={this.state.totalAircraft}
            avgFleetAge={this.state.avgFleetAge}
            noOldFleet={this.state.noOldFleet}
            accidents={this.state.accidents}
            fatalAccidents={this.state.fatalAccidents} 
            />
            
            }
        </div>
    </div>
    );
  }

  private handleChange(event: any)
  {
    this.setState({searchTerm: event.target.value});
  }

  private onSearch(event: any){
    event.preventDefault();
    const link = 'https://v4p4sz5ijk.execute-api.us-east-1.amazonaws.com/anbdata/airlines/risk/profile-stats?api_key=2ff9bc80-b5a4-11e8-9ace-59e395f3e15c&states=&operators='+this.state.searchTerm+'&type=json';
    fetch(link, {
      method: 'GET'
    })
    .then((response : any) => {
      if(response.ok){
        response.json().then((data:any) => {
          if(data.length !== 0){
            this.setState({
              error: "0",
              airlineName: data[0].operatorName,
              airlineCode: data[0].operatorCode,
              avgFleetAge: data[0].av_fleet_age, 
              country: data[0].countryName,
              isInternational: data[0].is_international === true ? "YES" : "NO",
              routes: data[0].routes,
              totalAircraft: data[0].aircraft,
              noOldFleet: data[0].aircraft_over_25y,
              accidents: data[0].accidents_5y,
              fatalAccidents: data[0].fatalaccidents_5y 
            })
          }
          else{
              this.setState({
                error: "1"
              })
          }
        })
      }
    })
  }
}
