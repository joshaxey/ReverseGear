<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="layout2.xsl" />
    <xsl:output method="html" media-type="text/xml" indent="yes" />

    <!--=============================-->
    <!--====== Global variables =====-->
    <!--=============================-->
    <!-- Override these variables    -->
    <!-- in the Layout stylesheet.   -->
    <!--=============================-->
    <xsl:variable name="securePage" select="true()" />
    <xsl:variable name="layoutHeader" select="string('')" />
    <xsl:variable name="dynamicTitle" select="RmsInformation/@title" />
    <xsl:variable name="descriptionMain"><xsl:value-of select="RmsInformation/@subtitle" /></xsl:variable>
    <xsl:variable name="descriptionSub"><xsl:value-of select="RmsInformation/@explanation" /></xsl:variable>
    <xsl:variable name="formName" select="string('RMSWebConfig')" />
    <xsl:variable name="showAcceptCancel" select="true()" />
    <xsl:variable name="showActionButtonsOnTop" select="false()" />
    <xsl:variable name="showReboot" select="false()" />
    <xsl:variable name="formOnSubmit" select="string('return validateRMSForm(this)')" />
    <xsl:variable name="onload" select="string('checkAllowConnect()')" />
    <xsl:variable name="cancelAction" select="string('RMSWebConfig')" />

    <!--===================-->
    <!-- Content           -->
    <!--===================-->
    <xsl:template name="content">
        <!-- CSS : Slider -->
        <style type="text/css">
            table.datagrid {margin:10px;}
            table.datagrid td {padding-bottom:12px;}
        </style>


        <!-- READER -->
        <div class="sectionContainer">

            <div id="sb1" class="sectionWell">
                <table class="datagrid">
                    <tr>
                        <td colspan="2" style="vertical-align:middle;">
                            <input type="checkbox" name="allowConnect" id="allowConnect" style="vertical-align:middle;" onClick="checkAllowConnect();">
                                <xsl:if test="RmsInformation/@enabled = 'true'">
                                    <xsl:attribute name="checked">checked</xsl:attribute>
                                </xsl:if>
                            </input>
                            &#160;
                            <label for="allowConnect">Allow Master to Connect to RMS Server</label>
                        </td>
                    </tr>
                    <tr>
                        <!-- RMS Server URL -->
                        <td>
                            <label for="rmsServerUrl">RMS Server URL:<span style="color:#cc0000;font-weight:700;">*</span></label>
                        </td>
                        <td width="100%">
                            <input type="text" value="{RmsInformation/webConfig/@serverURL}" name="rmsServerUrl" id="rmsServerUrl" maxlength="256"  style="width:300px"/>
                        </td>
                    </tr>
                    <tr>
                        <!-- RMS Server Password -->
                        <td>
                            <label for="rmsServerPassword">RMS Server Password:<span style="color:#cc0000;font-weight:700;">*</span></label>
                        </td>
                        <td>
                            <input type="password" value="{RmsInformation/webConfig/@serverPassword}" name="rmsServerPassword" id="rmsServerPassword" maxlength="50" style="width:300px"/>
                        </td>
                    </tr>
                    <tr>
                        <!-- Client Gateway Name -->
                        <td>
                            <label for="clientGatewayName">Client Gateway Name:</label>
                        </td>
                        <td>
                            <input type="text" value="{RmsInformation/webConfig/@clientName}" name="clientGatewayName" id="clientGatewayName" maxlength="100" style="width:300px" />
                        </td>
                    </tr>
                    <!-- <tr>
                        <td colspan="2" style="vertical-align:middle;white-space:nowrap;">
                            <input type="checkbox" name="useSecureCommunication" id="useSecureCommunication" style="vertical-align:middle;">
                                <xsl:if test="RmsInformation/webConfig/@sslEnabled = 'true'">
                                    <xsl:attribute name="checked">checked</xsl:attribute>
                                </xsl:if>
                            </input>
                            &#160;
                            <label for="useSecureCommunication">Use Secure Communication (HTTPS/SSL)</label>
                        </td>
                    </tr> -->
                    <tr>
                        <td colspan="2" style="white-space:nowrap;">
                            <input type="button" value="Test Connection" id="testConnectionButton" onclick="testConnection();" />
                            <div id="testConnectionFeedback" style="padding-top:15px;display:none;">
                                &#160;
                            </div>
                            <div id="loadingIcon" style="padding-top:15px;display:none;">
                                <img src="assets/images/anim_loader_sm.gif" width="16" height="16" /> <span style="padding-left:8px;font-size:10px">Testing... Please wait.</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div style="font-size:11px;color:#000;">
                                <span style="color:#cc0000;font-weight:700;">*</span>Required
                            </div>
                        </td>
                    </tr>
                </table>

            </div>

        </div>


        <div id="spacer" style="width:25px;height:10px;"></div>

        <script language="JavaScript1.2">
            <![CDATA[
				// R O U N D E D    C O R N E R S
				// on the inside sections using Rico.js
				// see http://openrico.org/rico/demos.page?demo=rico_corner for options
				try {
					Rico.Corner.round('sb1', {compact:true});
			 	} catch(e) 
			 	{
			 	   alert('rico exception' + e);
			 	}
				
				]]>
        </script>

    </xsl:template>

</xsl:stylesheet>