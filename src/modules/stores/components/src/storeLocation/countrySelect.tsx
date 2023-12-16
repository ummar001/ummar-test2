import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useGetCountries } from "../../../api";
import { ICreateStorePayload } from "../../../types";

interface ICountrySelectProps {
  formValues: ICreateStorePayload
  setFormValues: Dispatch<SetStateAction<ICreateStorePayload>>
}

export const CountrySelect: FunctionComponent<ICountrySelectProps> = ({
  formValues,
  setFormValues,
}) => {
  const { t } = useTranslation("store");

  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { data } = useGetCountries();

  useEffect(() => {
    if (data) {
      setOptions(data);
    }
  }, [data]);

  const handleCountryChange = (
    event: React.ChangeEvent<unknown>,
    value: string | null
  ) => {
    setFormValues({
      ...formValues,
      location: {
        ...formValues.location,
        country: value ?? "",
      },
    });
  };

  const handleCountryFilter = (value: string) => {
    if (!data) return;
    const filteredCountries = data.filter((country: string) =>
      country.toLowerCase().startsWith(value.toLowerCase())
    );
    setOptions(filteredCountries);
  };

  return (
    <Autocomplete
      value={formValues.location.country}
      onChange={handleCountryChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        handleCountryFilter(newInputValue);
        setInputValue(newInputValue);
      }}
      options={options}
      id="country-select"
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("country")}
          variant="outlined"
          required
          sx={{
            borderRadius: 5,
            marginTop: 1.5,
          }}
        />
      )}
    />
  );
};
