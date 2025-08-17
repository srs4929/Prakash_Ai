import { Grid as MuiGrid } from '@mui/material';
import type { GridProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomGridProps extends GridProps {
  item?: boolean;
}

export const Grid = styled(MuiGrid)<CustomGridProps>(() => ({}));
