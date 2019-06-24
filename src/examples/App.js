import React from "react";
import { CardWidgets, PopUpFormWidgets } from "../lib";
import Test from "./Test";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_data: [
        {
          id:"Email",
          label: "Email",
          type: "text",
          inputStyle: "",
          placeholder: "",
          name: "Email",
          value: null
        },
        {
          id:"Cemail",
          label: "Confirm Email",
          type: "text",
          inputStyle: "",
          placeholder: "Type here",
          name: "Cemail",
          value: null
        }
      ],
      _data2: [["Sun", 32], ["Mon", 46], ["Tue", 28]],
      messages: { empty: "No data" },
      _data: [
        {
          caption: "Pizza",
          number: "₦ 245000",
          description: "Lunch Fees",
          progress: "29",
          _chartdata: [["Sun", 22], ["Mon", 86], ["Tue", 28], ["Wed", 38]]
        },
        {
          caption: "Burger",
          number: "₦ 66700",
          description: "Lunch Fees",
          progress: "81",
          _chartdata: [["Sun", 12], ["Mon", 46], ["Tue", 48], ["Wed", 38]]
        },
        {
          caption: "Meat Pie",
          number: "₦ 26899",
          description: "Lunch Fees",
          progress: "59",
          _chartdata: [["Sun", 52], ["Mon", 16], ["Tue", 38], ["Wed", 31]]
        },
        {
          caption: "Chips",
          number: "₦ 26899",
          description: "Lunch Fees",
          progress: "49",
          _chartdata: [["Sun", 52], ["Mon", 55], ["Tue", 38], ["Wed", 28]]
        },
        {
          caption: "Chicken",
          number: "₦ 26899",
          description: "Lunch Fees",
          progress: "89",
          _chartdata: [["Sun", 22], ["Mon", 36], ["Tue", 38], ["Wed", 18]]
        }
      ]
    };
  }

  printData = () => {
    console.log("");
  };

  render() {
    console.log("state hee", this.state);
    return (
      <div>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Card Widgets
        </h2>
        <CardWidgets
          themeColor="rgb(255,143,0)"
          chartBgColor="white"
          cardData={this.state._data}
          renderCharts={true}
          xTitle="Days"
          yTitle="Number"
          messages={{ empty: "No data" }}
          downloadable={false}
          chartData={this.state._data}
          viewMoreButton={{
            show: true,
            text: "MORE",
            link: "https://www.google.com"
          }}
          customChart={() => <Test />}
        />

        <PopUpFormWidgets
          formData={this.state.form_data}
          openButton={{ text: "Open Form", textColor: "white" }}
          closeButton={{ text: "Close Form ", textColor: "white" }}
          submitButton={{ text: "Register", textColor: "grey" }}
        />
      </div>
    );
  }
}

export default App;
