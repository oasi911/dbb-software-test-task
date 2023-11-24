import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DeleteMenuItem from "./DeleteItem";

const FileMenu = ({ file, onChange }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<ChevronDownIcon />}
        variant="outline"
        size="xs"
      />
      <MenuList>
        <MenuItem disabled>Properties</MenuItem>
        <MenuItem disabled>Move to...</MenuItem>
        <DeleteMenuItem
          filePath={file.path_lower}
          onChange={onChange}
        />
      </MenuList>
    </Menu>
  );
};

export default FileMenu;
