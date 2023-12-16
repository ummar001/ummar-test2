import Cover1 from "@/common/assets/storeCovers/cover_1.png";
import Cover2 from "@/common/assets/storeCovers/cover_2.png";
import Cover3 from "@/common/assets/storeCovers/cover_3.png";
import Cover4 from "@/common/assets/storeCovers/cover_4.png";
import Cover5 from "@/common/assets/storeCovers/cover_5.png";
import { Card } from "@/common/components";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { ICreateStorePayload } from "../../types";

interface ICoverImageCardProps {
  coverImage: StaticImageData | string
  selected: boolean
  handleSelectCover: (image: StaticImageData, key: number) => void
  index: number
}

const CoverImageCard: FunctionComponent<ICoverImageCardProps> = ({
  coverImage,
  selected,
  handleSelectCover,
  index,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <Image
      src={coverImage}
      alt="Cover Image"
      width={isSmallScreen ? 50 : 81}
      height={isSmallScreen ? 50 : 81}
      onClick={() => handleSelectCover(coverImage as StaticImageData, index)}
      style={{
        borderRadius: isSmallScreen ? 12 : 20,
        cursor: selected ? "default" : "pointer",
        border: selected ? "2px solid #FF5E5D" : 0,
      }}
    />
  );
};

interface IStoreCoverProps {
  formValues: ICreateStorePayload
  setFormValues: Dispatch<SetStateAction<ICreateStorePayload>>
}

export const StoreCover: FunctionComponent<IStoreCoverProps> = ({
  formValues,
  setFormValues,
}) => {
  const { t } = useTranslation("store");
  
  const [selectedCover, setSelectedCover] = useState<string | null>(
    formValues.storeCover
  );
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  useEffect(() => {
    if (isFirstRender && formValues.storeCover) {
      setSelectedCover(formValues.storeCover + `?timestamp=${Date.now()}`);
    }
    setIsFirstRender(false);
  }, [formValues, isFirstRender, setFormValues]);

  const onDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acceptedFiles: any) => {
      setFormValues({
        ...formValues,
        storeCover: acceptedFiles[0],
      });
      setSelectedCover(URL.createObjectURL(acceptedFiles[0]));
      setSelectedTemplate(0);
    },
    [formValues, setFormValues]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSelectTemplate = useCallback(
    async (image: StaticImageData, key: number) => {
      const response = await fetch(image.src);
      const arrayBuffer = await response.blob();

      setFormValues({
        ...formValues,
        storeCover: arrayBuffer as unknown as string,
      });
      setSelectedCover(null);
      setSelectedTemplate(key);
    },
    [formValues, setFormValues]
  );

  return (
    <Card title={t("storeCover")}>
      <Typography fontWeight={500} color="#43434399">
        {t("storeCoverDesc")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: {
            sm: 2,
            md: 4,
          },
          alignItems: "flex-start",
          marginTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Box
          {...getRootProps()}
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          <input {...getInputProps()} />
          {selectedCover ? (
            <Box
              sx={{
                height: { md: 81 },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
              }}
            >
              <CoverImageCard
                coverImage={selectedCover}
                selected
                key="0"
                index={0}
                handleSelectCover={handleSelectTemplate}
              />
              <button
                style={{
                  color: "#434343",
                  backgroundColor: "transparent",
                  border: 0,
                  textDecoration: "underline",
                  fontSize: ".95rem",
                  fontWeight: 500,
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedCover(null)}
              >
                {t("deleteImage")}
              </button>
            </Box>
          ) : (
            <Box
              sx={{
                border: isDragActive ? "2px solid #FF5E5D" : 0,
                width: { xs: "100%", sm: 81 },
                height: 81,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                backgroundColor: "#F5F5F5",
                cursor: "pointer",
              }}
            >
              <FileUploadIcon fontSize="small" />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: { xs: "100%", sm: "auto" },
            justifyContent: "space-between",
            marginTop: {
              xs: 2,
              sm: 0,
            },
            gap: {
              xs: "2%",
              sm: 2,
              md: 4,
            },
          }}
        >
          <CoverImageCard
            coverImage={Cover1}
            key="1"
            index={1}
            handleSelectCover={handleSelectTemplate}
            selected={selectedTemplate === 1}
          />
          <CoverImageCard
            coverImage={Cover2}
            key="2"
            index={2}
            handleSelectCover={handleSelectTemplate}
            selected={selectedTemplate === 2}
          />
          <CoverImageCard
            coverImage={Cover3}
            key="3"
            index={3}
            handleSelectCover={handleSelectTemplate}
            selected={selectedTemplate === 3}
          />
          <CoverImageCard
            coverImage={Cover4}
            key="4"
            index={4}
            handleSelectCover={handleSelectTemplate}
            selected={selectedTemplate === 4}
          />
          <CoverImageCard
            coverImage={Cover5}
            key="5"
            index={5}
            handleSelectCover={handleSelectTemplate}
            selected={selectedTemplate === 5}
          />
        </Box>
      </Box>
    </Card>
  );
};
