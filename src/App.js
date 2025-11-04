import "./App.css";
// import Test from "./comp/Test";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

// mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// external
import axios from "axios";
import moment from "moment/moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

// 103
let cancelAxios = null;

function App() {
  const { t, i18n } = useTranslation();

  // =========== state
  const [date, setDate] = useState("");

  // // // 102
  const [temp, setTemp] = useState({
    number: null,
    des: "",
    min: null,
    max: null,
    icon: null,
  });
  const [local, setLocal] = useState("ar");

  // // // 108
  const direc = local == "ar" ? "rtl" : "ltr";

  // ========= event handeler
  function hanedelLang() {
    if (local == "en") {
      setLocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  useEffect(() => {
    i18n.changeLanguage(local);

  }, []);

  useEffect(() => {
    // 105
    setDate(moment().format("MMMM Do YYYY, h:mm:ss a"));

    // Make a request for a user with a given ID
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=13.96667&lon=44.18333&appid=2fd84d744d345aa9ca383c449ebb21d9",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const reqTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const des = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;

        setTemp({
          number: reqTemp,
          min: min,
          max: max,
          des: des,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        });
        console.log(response, icon);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      console.log("canceling");
      cancelAxios();
    };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* content container */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* card */}
            <div
              dir={direc}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgb(0, 0, 0, 0.05)",
              }}
            >
              {/* content */}
              <div>
                {/* city & time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={direc}
                >
                  <Typography
                    variant="h2"
                    style={{ marginRight: "20px", fontWeight: "600" }}
                  >
                    {t("Ibb")}
                  </Typography>

                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {date}
                  </Typography>
                </div>
                {/* city & time */}

                <hr />

                {/* container of degree + cloud icon */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* degree & description */}
                  <div>
                    {/* temp */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      <img src={temp.icon} alt="" />
                    </div>
                    {/* temp */}

                    <Typography variant="h6">{t(temp.des)}</Typography>

                    {/* min & max */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>{temp.min} :{t("min")}</h5>
                      <h5 style={{ margin: "0px 5px" }}>|</h5>
                      <h5>{temp.max} :{t("max")}</h5>
                    </div>
                    {/* min & max */}
                  </div>
                  {/* degree & description */}

                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
                {/* container of degree + cloud icon */}
              </div>
              {/* content */}
            </div>
            {/* card */}

            {/* translattion container */}
            <div
              dir={direc}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              <Button style={{ color: "white" }} variant="text" onClick={hanedelLang}>
                {local == "en" ? "Arabic" : "إنحليزي"}
              </Button>
            </div>
            {/* translattion container */}
          </div>
          {/* content container */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;

// 100
// 101 = req to ibb = https://api.openweathermap.org/data/2.5/weather?lat=13.96667&lon=44.18333&appid=2fd84d744d345aa9ca383c449ebb21d9
//108
//109
