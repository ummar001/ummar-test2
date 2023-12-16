import { useDebounce } from "@/common/hooks";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetAddress } from "../../../api";
import { ICreateStorePayload } from "../../../types";

interface ICitySelectProps {
  formValues: ICreateStorePayload
  setFormValues: Dispatch<SetStateAction<ICreateStorePayload>>
}

export const AddressSelect: FunctionComponent<ICitySelectProps> = ({
  formValues,
  setFormValues,
}) => {
  const { t } = useTranslation("store");

  const [inputValue, setInputValue] = useState<string>("");
  const searchParams = useDebounce(inputValue, 250);
  const { data } = useGetAddress(
    searchParams,
    formValues.location.country,
    formValues.location.city
  );

  const options = data?.map((item) => item.address) || [];

  const handleAddressChange = (
    event: React.ChangeEvent<unknown>,
    value: string | null
  ) => {
    const selectedAddress = data?.find((item) => item.address === value);
    setFormValues({
      ...formValues,
      location: {
        ...formValues.location,
        addressLine1: value ?? "",
        gpsCordinate: selectedAddress
          ? selectedAddress.coordinates.toString()
          : "",
      },
    });
  };

  return (
    <Autocomplete
      value={formValues.location.addressLine1}
      onChange={handleAddressChange}
      inputValue={formValues.location.addressLine1}
      onInputChange={(event, newInputValue) => {
        handleAddressChange(event, newInputValue);
        setInputValue(newInputValue);
      }}
      id="address-select"
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("addressLine")}
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
