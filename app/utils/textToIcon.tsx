import CategoryIcon from "@mui/icons-material/Category";
import RectangleIcon from "@mui/icons-material/Rectangle";
import WebIcon from "@mui/icons-material/Web";
import CodeIcon from "@mui/icons-material/Code";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletIcon from "@mui/icons-material/Tablet";
import LaptopIcon from "@mui/icons-material/Laptop";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BuildIcon from "@mui/icons-material/Build";
import BugReportIcon from "@mui/icons-material/BugReport";
import SpeedIcon from "@mui/icons-material/Speed";
import TimelineIcon from "@mui/icons-material/Timeline";
import TuneIcon from "@mui/icons-material/Tune";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExtensionIcon from "@mui/icons-material/Extension";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ViewArrayIcon from "@mui/icons-material/ViewArray";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridOnIcon from "@mui/icons-material/GridOn";
import TableChartIcon from "@mui/icons-material/TableChart";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import BorderOuterIcon from "@mui/icons-material/BorderOuter";
import BorderInnerIcon from "@mui/icons-material/BorderInner";
import BorderClearIcon from "@mui/icons-material/BorderClear";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TitleIcon from "@mui/icons-material/Title";
import ShortTextIcon from "@mui/icons-material/ShortText";
import NotesIcon from "@mui/icons-material/Notes";
import SubjectIcon from "@mui/icons-material/Subject";
import LinkIcon from "@mui/icons-material/Link";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LaunchIcon from "@mui/icons-material/Launch";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import SettingsInputHdmiIcon from "@mui/icons-material/SettingsInputHdmi";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import ContrastIcon from "@mui/icons-material/Contrast";
import ExposureIcon from "@mui/icons-material/Exposure";
import FilterIcon from "@mui/icons-material/Filter";
import FilterBAndWIcon from "@mui/icons-material/FilterBAndW";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PaletteIcon from "@mui/icons-material/Palette";
import GradientIcon from "@mui/icons-material/Gradient";
import OpacityIcon from "@mui/icons-material/Opacity";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";
import CropIcon from "@mui/icons-material/Crop";
import CropFreeIcon from "@mui/icons-material/CropFree";
import CropDinIcon from "@mui/icons-material/CropDin";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import ImageIcon from "@mui/icons-material/Image";
import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";
import PanoramaIcon from "@mui/icons-material/Panorama";
import MovieIcon from "@mui/icons-material/Movie";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ReplayIcon from "@mui/icons-material/Replay";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export function TextToIcon({
  text,
  size,
  fontSize,
  className,
}: {
  text: string;
  size?: "small" | "medium" | "large";
  fontSize?: number;
  className?: string;
}) {
  switch (text) {
    case "RectangleIcon":
      return (
        <RectangleIcon
          fontSize={size}
          sx={{ fontSize: fontSize }}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CategoryIcon":
      return (
        <CategoryIcon
          fontSize={size}
          sx={{ fontSize: fontSize }}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ShuffleIcon":
      return (
        <ShuffleIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ReplayIcon":
      return (
        <ReplayIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SkipNextIcon":
      return (
        <SkipNextIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SkipPreviousIcon":
      return (
        <SkipPreviousIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "StopCircleIcon":
      return (
        <StopCircleIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "PlayCircleFilledIcon":
      return (
        <PlayCircleFilledIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "PauseCircleFilledIcon":
      return (
        <PauseCircleFilledIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FormatColorFillIcon":
      return (
        <FormatColorFillIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FormatBoldIcon":
      return (
        <FormatBoldIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FormatItalicIcon":
      return (
        <FormatItalicIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FormatUnderlinedIcon":
      return (
        <FormatUnderlinedIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "QueueMusicIcon":
      return (
        <QueueMusicIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "MusicNoteIcon":
      return (
        <MusicNoteIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "MovieFilterIcon":
      return (
        <MovieFilterIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "MovieIcon":
      return (
        <MovieIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "PanoramaIcon":
      return (
        <PanoramaIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ImageAspectRatioIcon":
      return (
        <ImageAspectRatioIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ImageIcon":
      return (
        <ImageIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CropSquareIcon":
      return (
        <CropSquareIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CropDinIcon":
      return (
        <CropDinIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CropFreeIcon":
      return (
        <CropFreeIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CropIcon":
      return (
        <CropIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BlurOnIcon":
      return (
        <BlurOnIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BlurCircularIcon":
      return (
        <BlurCircularIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "OpacityIcon":
      return (
        <OpacityIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ColorLensIcon":
      return (
        <ColorLensIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "PaletteIcon":
      return (
        <PaletteIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "GradientIcon":
      return (
        <GradientIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FilterBAndWIcon":
      return (
        <FilterBAndWIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "WebIcon":
      return (
        <WebIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CodeIcon":
      return (
        <CodeIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "DeveloperModeIcon":
      return (
        <DeveloperModeIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "DesktopWindowsIcon":
      return (
        <DesktopWindowsIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "PhoneIphoneIcon":
      return (
        <PhoneIphoneIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "TabletIcon":
      return (
        <TabletIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "LaptopIcon":
      return (
        <LaptopIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "StorageIcon":
      return (
        <StorageIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CloudUploadIcon":
      return (
        <CloudUploadIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CloudDownloadIcon":
      return (
        <CloudDownloadIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FolderIcon":
      return (
        <FolderIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FolderOpenIcon":
      return (
        <FolderOpenIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "InsertDriveFileIcon":
      return (
        <InsertDriveFileIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CreateNewFolderIcon":
      return (
        <CreateNewFolderIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SaveAltIcon":
      return (
        <SaveAltIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "DeleteForeverIcon":
      return (
        <DeleteForeverIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BuildIcon":
      return (
        <BuildIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BugReportIcon":
      return (
        <BugReportIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SpeedIcon":
      return (
        <SpeedIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "TimelineIcon":
      return (
        <TimelineIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "TuneIcon":
      return (
        <TuneIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SettingsApplicationsIcon":
      return (
        <SettingsApplicationsIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ExtensionIcon":
      return (
        <ExtensionIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ViewModuleIcon":
      return (
        <ViewModuleIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ViewQuiltIcon":
      return (
        <ViewQuiltIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ViewCompactIcon":
      return (
        <ViewCompactIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ViewStreamIcon":
      return (
        <ViewStreamIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ViewArrayIcon":
      return (
        <ViewArrayIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ViewCarouselIcon":
      return (
        <ViewCarouselIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ViewColumnIcon":
      return (
        <ViewColumnIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ViewListIcon":
      return (
        <ViewListIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "GridOnIcon":
      return (
        <GridOnIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "TableChartIcon":
      return (
        <TableChartIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FormatAlignLeftIcon":
      return (
        <FormatAlignLeftIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FormatAlignCenterIcon":
      return (
        <FormatAlignCenterIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FormatAlignRightIcon":
      return (
        <FormatAlignRightIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FormatAlignJustifyIcon":
      return (
        <FormatAlignJustifyIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BorderAllIcon":
      return (
        <BorderAllIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BorderOuterIcon":
      return (
        <BorderOuterIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BorderInnerIcon":
      return (
        <BorderInnerIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BorderClearIcon":
      return (
        <BorderClearIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "TextFieldsIcon":
      return (
        <TextFieldsIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "TitleIcon":
      return (
        <TitleIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ShortTextIcon":
      return (
        <ShortTextIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "NotesIcon":
      return (
        <NotesIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SubjectIcon":
      return (
        <SubjectIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "LinkIcon":
      return (
        <LinkIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "AddLinkIcon":
      return (
        <AddLinkIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "LaunchIcon":
      return (
        <LaunchIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "AttachFileIcon":
      return (
        <AttachFileIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CloudIcon":
      return (
        <CloudIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CloudQueueIcon":
      return (
        <CloudQueueIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CloudDoneIcon":
      return (
        <CloudDoneIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "CloudOffIcon":
      return (
        <CloudOffIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SettingsEthernetIcon":
      return (
        <SettingsEthernetIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SettingsInputComponentIcon":
      return (
        <SettingsInputComponentIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SettingsInputHdmiIcon":
      return (
        <SettingsInputHdmiIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SettingsInputSvideoIcon":
      return (
        <SettingsInputSvideoIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SettingsOverscanIcon":
      return (
        <SettingsOverscanIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "SettingsBrightnessIcon":
      return (
        <SettingsBrightnessIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "BrightnessMediumIcon":
      return (
        <BrightnessMediumIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ContrastIcon":
      return (
        <ContrastIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "ExposureIcon":
      return (
        <ExposureIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    case "FilterIcon":
      return (
        <FilterIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
    default:
      return (
        <CategoryIcon
          sx={{ fontSize: fontSize }}
          fontSize={size}
          className={`text-sky-400 ${className}`}
        />
      );
  }
}
