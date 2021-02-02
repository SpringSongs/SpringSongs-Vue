package io.github.springsongs.modules.sys.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import io.github.springsongs.annotation.Description;
import io.swagger.annotations.ApiModelProperty;

@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@Table(name = "spring_role_data", schema = "springsongs")
public class SpringRoleData implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Description(title = "主键")
	@Column(name = "id")
	@ApiModelProperty("主键")
	private int id;

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	@ApiModelProperty("data_id")
	@Description(title = "data_id")
	@Column(name = "data_id")
	private int dataId;

	public int getDataId() {
		return this.dataId;
	}

	public void setDataId(int dataId) {
		this.dataId = dataId;
	}


	@NotBlank(message = "请填写role_id")
	@Size(max = 36, min = 1)
	@ApiModelProperty("role_id")
	@Description(title = "role_id")
	@Column(name = "role_id")
	private String roleId;

	public String getRoleId() {
		return this.roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	@NotBlank(message = "请填写system_code")
	@Size(max = 45, min = 1)
	@ApiModelProperty("system_code")
	@Description(title = "system_code")
	@Column(name = "system_code")
	private String systemCode;

	public String getSystemCode() {
		return this.systemCode;
	}

	public void setSystemCode(String systemCode) {
		this.systemCode = systemCode;
	}

}
