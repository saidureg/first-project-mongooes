import catchAsync from '../../utils/catchAsync';
import { AdminService } from './admin.service';

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdminFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdminsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'All Admins fetched successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminService.updateAdminInDB(id, admin);
  res.status(200).json({
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdminFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
