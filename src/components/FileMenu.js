import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DeleteMenuItem from "./DeleteItem";

// FileMenu component to provide file options like delete, properties, etc.
const FileMenu = ({ file, onChange }) => {
  return (
    <Menu>
      {/* MenuButton triggers the dropdown menu */}
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<ChevronDownIcon />}
        variant="outline"
        size="xs"
      />
      {/* MenuList contains the list of menu options */}
      <MenuList>
        {/* Tooltip provides additional information on hover */}
        <Tooltip label="Not implemented">
          {/* MenuItem for file properties; currently not functional */}
          <MenuItem bg="gray.400" cursor="auto">
            Properties
          </MenuItem>
        </Tooltip>
        <Tooltip label="Not implemented">
          {/* MenuItem for moving the file; currently not functional */}
          <MenuItem bg="gray.400" cursor="auto">
            Move to...
          </MenuItem>
        </Tooltip>
        {/* DeleteMenuItem component handles file deletion */}
        <DeleteMenuItem filePath={file.path_lower} onChange={onChange} />
      </MenuList>
    </Menu>
  );
};

export default FileMenu;
