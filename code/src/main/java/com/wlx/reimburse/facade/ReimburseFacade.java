package com.wlx.reimburse.facade;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wlx.reimburse.common.StatusConstants;
import com.wlx.reimburse.common.TimeUtil;
import com.wlx.reimburse.dto.ReimburseDTO;
import com.wlx.reimburse.excel.model.ReimburseExcelModel;
import com.wlx.reimburse.model.ReimburseBaseVO;
import com.wlx.reimburse.model.ReimburseDetailVO;

@Component
public class ReimburseFacade extends BaseFacade{

	@Autowired
	private ReimburseBaseFacade reimburseBaseFacade;
	
	@Autowired
	private ReimburseDetailFacade reimburseDetailFacade;
	
	@Autowired
	private DepartmentFacade departmentFacade;
	

	public boolean save(ReimburseDTO dto){
		ReimburseBaseVO reimburseBase = dto.getReimburseBase();
		List<ReimburseDetailVO> reimburseDetails = dto.getReimburseDetails();
		int id = 0;
		String danhao = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(System.currentTimeMillis());
		if (reimburseBase != null) {
			reimburseBase.setDanHao(danhao);
			id = reimburseBaseFacade.save(reimburseBase);
		}
		System.out.println(id);
		if (reimburseDetails != null && reimburseDetails.size() > 0) {
			for (ReimburseDetailVO detailVO : reimburseDetails) {
				detailVO.setDanHao(danhao);
			}
			reimburseDetailFacade.saves(reimburseDetails);
		}
		return true;
	}
	
	public boolean delete(String danHao) {
		ReimburseBaseVO reimburseBase = new ReimburseBaseVO();
		reimburseBase.setDanHao(danHao);
		reimburseBaseFacade.deleteByVO(reimburseBase);
		ReimburseDetailVO detailVO = new ReimburseDetailVO();
		detailVO.setDanHao(danHao);
		reimburseDetailFacade.deleteByVO(detailVO);
		return true;
		
	}
	
	public ReimburseDTO get(String danHao) {
		ReimburseBaseVO reimburseBase = new ReimburseBaseVO();
		reimburseBase.setDanHao(danHao);
		reimburseBase.setPageNo(0);
		reimburseBase.setPageSize(1);
		reimburseBase = reimburseBaseFacade.getByVO(reimburseBase).get(0);
		ReimburseDetailVO detailVO = new ReimburseDetailVO();
		detailVO.setDanHao(danHao);
		List<ReimburseDetailVO> list = reimburseDetailFacade.getByVO(detailVO);
		ReimburseDTO dto = new ReimburseDTO();
		dto.setReimburseBase(reimburseBase);
		dto.setReimburseDetails(list);
		return dto;
		
	}
	
	public Boolean update(ReimburseDTO dto) {
		
		ReimburseBaseVO reimburseBase = dto.getReimburseBase();
		List<ReimburseDetailVO> reimburseDetails = dto.getReimburseDetails();
		reimburseBaseFacade.update(reimburseBase);
		
		//删除原理的detail
		ReimburseDetailVO detailVO = new ReimburseDetailVO();
		detailVO.setDanHao(reimburseBase.getDanHao());
		reimburseDetailFacade.deleteByVO(detailVO);
		
		if (reimburseDetails != null && reimburseDetails.size() > 0) {
			for (ReimburseDetailVO vo : reimburseDetails) {
				vo.setDanHao(reimburseBase.getDanHao());
			}
			reimburseDetailFacade.saves(reimburseDetails);
		}
		
		return true;
		
	}
	
	public List<ReimburseExcelModel> getDownData(ReimburseBaseVO param){
		
        
        
        List<ReimburseExcelModel> dataset=new ArrayList<ReimburseExcelModel>();
        ReimburseExcelModel excelModel = null;
        param.setPageNo(0);
        param.setPageSize(10000);
        List<ReimburseBaseVO> baseList = reimburseBaseFacade.getByVO(param);
        ReimburseDetailVO detailVO = null;
        for (ReimburseBaseVO baseVO : baseList) {
        	
//        	public ReimburseExcelModel(String danHao,String employmentName,String departmentName,String total, 
//            		Timestamp createTime,String status)
        	
        	/*excelModel = new ReimburseExcelModel(baseVO.getDanHao(), baseVO.getEmploymentName(), baseVO.getDepartmentName(),
    				baseVO.getName(),baseVO.getTotal(),
    				baseVO.getCreateTime(), StatusConstants.getByCode(baseVO.getStatus()).getName());
    		dataset.add(excelModel);*/
        	
        	detailVO = new ReimburseDetailVO();
    		detailVO.setDanHao(baseVO.getDanHao());
    		List<ReimburseDetailVO> list = reimburseDetailFacade.getByVO(detailVO);
    		for (ReimburseDetailVO detail : list) {
//            	public ReimburseExcelModel(String type,String projectBianHao,String projectName,String beginTime,String endTime,
//        		String money,String description)
    			
    			excelModel = new ReimburseExcelModel(detail.getTypeName(), detail.getProjectBianHao(),detail.getProjectName(),
    					TimeUtil.timestamp2string(detail.getBeginTime()),TimeUtil.timestamp2string(detail.getEndTime()), detail.getMoney(), detail.getDescription());
    			excelModel.setDanHao(baseVO.getDanHao());
    			excelModel.setEmploymentName(baseVO.getEmploymentName());
    			excelModel.setDepartmentName(baseVO.getDepartmentName());
    			excelModel.setName(baseVO.getName());
    			excelModel.setTotal(baseVO.getTotal());
    			excelModel.setCreateTime(baseVO.getCreateTime());
    			excelModel.setStatus(StatusConstants.getByCode(baseVO.getStatus()).getName());
    			
    			dataset.add(excelModel);
    		}
    		
        }
       return dataset;
	}
	

	
	
}
