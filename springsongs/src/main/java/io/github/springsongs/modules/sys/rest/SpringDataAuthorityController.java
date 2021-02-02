package io.github.springsongs.modules.sys.rest;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.springsongs.common.dto.ReponseResultPageDTO;
import io.github.springsongs.common.dto.ResponseDTO;
import io.github.springsongs.common.web.BaseController;
import io.github.springsongs.enumeration.ResultCode;
import io.github.springsongs.modules.sys.dto.SpringDataAuthorityDTO;
import io.github.springsongs.modules.sys.query.SpringDataAuthorityQuery;
import io.github.springsongs.modules.sys.service.ISpringDataAuthorityService;
import io.github.springsongs.util.IpKit;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@Api("SpringDataAuthority域相关的api")
@RequestMapping(value = "/SpringDataAuthority")
public class SpringDataAuthorityController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(SpringDataAuthorityController.class);
	@Autowired
	private ISpringDataAuthorityService springDataAuthorityService;

	@ApiOperation(value = "获取SpringDataAuthority分页列表", response = ReponseResultPageDTO.class)
	@ApiImplicitParams({ @ApiImplicitParam(name = "springDataAuthorityQuery", dataType = "SpringDataAuthorityQuery"),
			@ApiImplicitParam(name = "pageable", dataType = "Pageable"), })
	@PostMapping(value = "/ListByPage")
	public ReponseResultPageDTO<SpringDataAuthorityDTO> listByPage(@RequestBody SpringDataAuthorityQuery query,
			@PageableDefault(page = 1, size = 20) Pageable pageable) {
		Page<SpringDataAuthorityDTO> lists = springDataAuthorityService.getAllRecordByPage(query, pageable);
		return ReponseResultPageDTO.successed(lists.getContent(), lists.getTotalElements(),
				ResultCode.SELECT_SUCCESSED);
	}

	@ApiOperation(value = "获取SpringDataAuthority")
	@ApiImplicitParams({ @ApiImplicitParam(name = "id", dataType = "String") })
	@GetMapping(value = "/Detail")
	public ResponseDTO<SpringDataAuthorityDTO> get(@NotEmpty(message = "id不能为空") Integer id) {
		SpringDataAuthorityDTO entity = springDataAuthorityService.selectByPrimaryKey(id);
		return ResponseDTO.successed(entity, ResultCode.SELECT_SUCCESSED);
	}

	@ApiOperation(value = "创建SpringDataAuthority", notes = "根据SpringDataAuthorityDTO内容管理")
	@ApiImplicitParams({ @ApiImplicitParam(name = "viewEntity", dataType = "SpringDataAuthorityDTO"),
			@ApiImplicitParam(name = "request", dataType = "HttpServletRequest"), })
	@PostMapping(value = "/Create")
	public ResponseDTO<String> save(@RequestBody @Valid SpringDataAuthorityDTO viewEntity, HttpServletRequest request) {
		viewEntity.setCreatedBy(this.getUser().getUserName());
		viewEntity.setCreatedUserId(this.getUser().getId());
		viewEntity.setCreatedIp(IpKit.getRealIp(request));
		viewEntity.setCreatedOn(new Date());
		springDataAuthorityService.insert(viewEntity);
		return ResponseDTO.successed(null, ResultCode.SAVE_SUCCESSED);
	}

	@ApiOperation(value = "修改SpringDataAuthority", notes = "根据SpringDataAuthorityDTO对象修改请假管理")
	@ApiImplicitParams({ @ApiImplicitParam(name = "viewEntity", dataType = "SpringDataAuthorityDTO"),
			@ApiImplicitParam(name = "request", dataType = "HttpServletRequest"), })
	@PutMapping(value = "/Edit")
	public ResponseDTO<String> update(@RequestBody @Valid SpringDataAuthorityDTO viewEntity,
			HttpServletRequest request) {
		viewEntity.setUpdatedBy(this.getUser().getUserName());
		viewEntity.setUpdatedUserId(this.getUser().getId());
		viewEntity.setUpdatedIp(IpKit.getRealIp(request));
		viewEntity.setUpdatedOn(new Date());
		springDataAuthorityService.updateByPrimaryKey(viewEntity);
		return ResponseDTO.successed(null, ResultCode.UPDATE_SUCCESSED);
	}

	@ApiOperation(value = "删除SpringDataAuthority", notes = "根据List<String>对象删除SpringDataAuthority管理")
	@ApiImplicitParam(dataType = "List<String>", name = "ids", value = "SpringDataAuthority编号", required = true)
	@PostMapping(value = "/SetDeleted")
	public ResponseDTO<String> setDeleted(@RequestParam(value = "ids") List<Integer> ids) {
		springDataAuthorityService.setDeleted(ids);
		return ResponseDTO.successed(null, ResultCode.DELETE_SUCCESSED);
	}
}