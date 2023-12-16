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
import { useGetCities } from "../../../api";
import { ICreateStorePayload } from "../../../types";

interface ICitySelectProps {
  formValues: ICreateStorePayload
  setFormValues: Dispatch<SetStateAction<ICreateStorePayload>>
}

export const CitySelect: FunctionComponent<ICitySelectProps> = ({
  formValues,
  setFormValues,
}) => {
  const { t } = useTranslation("store");

  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { data, refetch } = useGetCities(formValues.location.country);

  useEffect(() => {
    if (data) {
      const filter = data[0].filter((city: string) =>
        city.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setOptions(filter);
    }
  }, [data, inputValue]);

  useEffect(() => {
    if (formValues.location.country) {
      refetch();
    }
  }, [refetch, formValues.location.country]);

  const handleCityChange = (
    event: React.ChangeEvent<unknown>,
    value: string | null
  ) => {
    setFormValues({
      ...formValues,
      location: {
        ...formValues.location,
        city: value ?? "",
      },
    });
  };

  const handleCityFilter = (value: string) => {
    if (!data) return;
    const filteredCities = data[0].filter((city: string) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );
    setOptions(filteredCities);
  };

  return (
    <Autocomplete
      value={formValues.location.city}
      onChange={handleCityChange}
      inputValue={inputValue}
      id="city-select"
      onInputChange={(event, newInputValue) => {
        handleCityFilter(newInputValue);
        setInputValue(newInputValue);
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("city")}
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
