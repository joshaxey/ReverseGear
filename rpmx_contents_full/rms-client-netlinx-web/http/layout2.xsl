<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" media-type="text/html" indent="yes" />

    <!--=============================-->
    <!--====== Global variables =====-->
    <!--=============================-->

    <!-- GUI Variables -->
    <xsl:variable name="showSubMenu" />
    <xsl:variable name="showDeviceSubMenu" />
    <xsl:variable name="showAcceptCancel" select="true()" />
    <xsl:variable name="showReboot" select="false()" />
    <xsl:variable name="showReinit" select="false()" />

    <!-- Misc stuff -->
    <xsl:variable name="upperStr"     select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
    <xsl:variable name="lowerStr"     select="'abcdefghijklmnopqrstuvwxyz'" />

    <!--=============================-->
    <!--====== Global variables =====-->
    <!--=============================-->
    <!-- These are overridden when   -->
    <!-- this stylesheet is imported -->
    <!-- by other stylesheets.       -->
    <!--=============================-->
    <!-- Does this page require login -->
    <xsl:variable name="securePage" select="false()" />

    <!-- Header of content -->
    <xsl:variable name="layoutHeader" select="string('Home')" />
    <xsl:variable name="mainNav" />
    <xsl:variable name="descriptionMain" />
    <xsl:variable name="descriptionSub"  />
    <xsl:variable name="descriptionMenu" />
    <xsl:variable name="deviceMenu" select="false()" />
    <xsl:variable name="hideGlobalForm" select="false()" />
    <xsl:variable name="formName"   />
    <xsl:variable name="formAction" />
    <xsl:variable name="formMethod" select="string('post')"/>
    <xsl:variable name="formOnSubmit" />
    <xsl:variable name="cancelAction" />
    <xsl:variable name="acceptAction" />
    <xsl:variable name="showActionButtonsOnTop" select="true()" />
    <xsl:variable name="reinitAction" />
    <xsl:variable name="onclickAction" />
    <xsl:variable name="onload"/>
    <xsl:variable name="hollowPage" select="false()" />
    <xsl:variable name="login" select="false()" />
    <xsl:variable name="dynamicTitle" select="string('RMS Web Configuration')" />

    <!--=======================================================-->
    <!--================== Document template ==================-->
    <!--=======================================================-->
    <xsl:template match="/">

        <html>

            <head>
                <title><xsl:value-of select="$layoutHeader" /></title>

                <!-- <meta http-equiv="content-type" content="text/html; charset=UTF-8" />-->
                <meta http-equiv="Content-Type" content="text/xml; charset=UTF-8" />
                <meta http-equiv="pragma" content="no-cache" />
                <meta http-equiv="expires" content="-1" />

                <!--  CSS -->
                <link rel="stylesheet" href="morpheus.css"  type="text/css" />

                <!-- JavaScript -->
                <script type="text/javascript" src="assets/scripts/cookies.js" />
                <script type="text/javascript" src="assets/scripts/imageRollover.js" />
                <script type="text/javascript" src="assets/scripts/prototype2.js" />
                <script type="text/javascript" src="assets/scripts/rico/rico.js" />
                <script type="text/javascript" src="assets/scripts/rico/ricoCommon.js" />
                <script type="text/javascript" src="assets/scripts/rico/ricoStyles.js" />
                <script type="text/javascript" src="assets/scripts/RMSWebConfig.js" />
                <script type="text/javascript" src="assets/scripts/domdrag.js" />

                <style type="text/css">
                    <!--
                    #titleContainer {
                    position:absolute;
                    top:78px;
                    left:10px;
                    width:545px;
                    height:18px;
                    text-align:left;
                    color:#fff;
                    font-weight:bold;
                    font-size:150%;
                    }
                    #titleContainer:before,
                    #titleContainer:after{
                        content: "";
                        display: block;
                    }
                    #titleContainer:before{
                        margin-bottom: .05em;
                        margin-left: 0.03em;
                        color: #333; /* shadow color */
                        background-color: transparent;
                    }
                    #titleContainer:after{
                        margin-top: -1.05em;
                        margin-left: -0.1ex;
                        color: #fff; /* text color */
                        background-color: transparent;
                    }
                    -->
                </style>
            </head>

            <body id="gradient">
                <xsl:if test="$hollowPage = false() and login = false()">
                    <xsl:attribute name="onload"><xsl:value-of select="$onload"/></xsl:attribute>
                </xsl:if>

                <div id="bodyContainer">

                    <!-- Resources: Header -->
                    <xsl:call-template name="header" />

                    <!-- Resources: Content -->
                    <div id="contentContainer">
                        <table width="100%">
                            <tr>
                                <td width="5" height="5" valign="top" background="assets/images/cnr_tl.gif"></td>
                                <td width="100%" height="5" background="assets/images/cnr_tm.gif"></td>
                                <td width="5" height="5" valign="top" background="assets/images/cnr_tr.gif"></td>
                            </tr>
                            <tr>
                                <td width="5" background="assets/images/cnr_ml.gif"><img src="assets/images/clear.gif" width="5" height="10" /></td>
                                <td width="100%" style="background:#d5e0ea;padding:0px 5px;" valign="top">
                                    <!--  BEGIN CONTENT WELL -->
                                    <div id="rt1" class="contentHeader">
                                        <table width="100%">
                                            <tr>
                                                <td height="19" width="100%" class="contentHeaderText bold"><xsl:value-of select="$layoutHeader" /></td>
                                            </tr>
                                        </table>
                                    </div>

                                    <form name="{$formName}" id="formAMX" method="{$formMethod}" action="{$formAction}">

                                        <xsl:if test="$formOnSubmit != ''">
                                            <xsl:attribute name="onsubmit"><xsl:value-of select="$formOnSubmit" /></xsl:attribute>
                                        </xsl:if>

                                        <div id="rb1" style="background:white;">
                                            <div class="contentWell">
                                                <!--  C O N T E N T   W E L L -->

                                                <xsl:if test="$hollowPage = false()">
                                                    <span class="subPageHeader"><xsl:value-of select="$descriptionMain"/><br />
                                                        <span class="pageDescription"><xsl:value-of select="$descriptionSub"/></span></span>
                                                </xsl:if>

                                                <xsl:if test="$showAcceptCancel = true() and $showActionButtonsOnTop = true()">
                                                    <div id="actionButtonsContainer" style="width:680px;">
                                                        <xsl:choose>
                                                            <xsl:when test="$cancelAction = ''">
                                                                <input type="image" src="assets/images/btn_cancel_off.gif" srcover="assets/images/btn_cancel_on.gif" name="reset" id="btn_submit" value="Cancel" width="101" height="26" class="middle handCursor" style="margin:0 5px;"/>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <img src="assets/images/btn_cancel_off.gif" srcover="assets/images/btn_cancel_on.gif" id="btn_cancel" class="middle handCursor" width="101" height="26" style="margin:0 5px;">
                                                                    <xsl:attribute name="onclick">location.replace('<xsl:value-of select="$cancelAction" />');</xsl:attribute>
                                                                </img>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                        <xsl:choose>
                                                            <xsl:when test="$acceptAction != ''">
                                                                <img src="assets/images/btn_accept_off.gif" srcover="assets/images/btn_accept_on.gif" id="btn_submit" class="middle handCursor" width="101" height="26" border="0">
                                                                    <xsl:attribute name="onclick"><xsl:value-of select="$acceptAction" /></xsl:attribute>
                                                                </img>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <input type="image" src="assets/images/btn_accept_off.gif" srcover="assets/images/btn_accept_on.gif" id="btn_submit" width="101" height="26" class="middle handCursor" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </div>
                                                </xsl:if>

                                                <xsl:call-template name="content" />

                                                <!--  E N D   C O N T E N T   W E L L -->
                                            </div>
                                        </div>

                                        <xsl:choose>
                                            <!-- A C T I O N   B U T T O N S   C O N T A I N E R -->
                                            <xsl:when test="$showAcceptCancel = true() or $showReboot = true() or $showReinit = true()">
                                                <div id="actionButtonsContainer">

                                                    <xsl:if test="$showReboot = true()">
                                                        <div id="rebootContainer" style="float:left;">
                                                            <img src="assets/images/btn_reboot_off.gif" srcover="assets/images/btn_reboot_on.gif" id="reboot" value="Reboot" width="101" height="26" class="middle handCursor" style="margin:0px 5px 0px 0px;">
                                                                <!--<xsl:attribute name="onclick">$('proc').src='/web/devices/system-onlineTree.xml?reboot=true<xsl:text disable-output-escaping="yes">&amp;</xsl:text>systemNumber=<xsl:value-of select="$systemNumber" />';</xsl:attribute>-->
                                                                <xsl:attribute name="onclick">rebootInBackground();</xsl:attribute>
                                                            </img>
                                                            <span id="rebootMsg" class="middle msgAlert blink" style="display:none;">Rebooting... Please wait.</span>
                                                            <span id="rebootTag" class="middle msgAlert" style="display:none;"></span>
                                                        </div>
                                                    </xsl:if>

                                                    <xsl:if test="$showReinit = true()">
                                                        <xsl:choose>
                                                            <xsl:when test="$reinitAction != ''">
                                                                <img src="assets/images/btn_reinitialize_off.gif" srcover="assets/images/btn_reinitialize_on.gif" id="btn_reinit" class="middle handCursor" width="101" height="26" style="margin:0px 5px 0px 0px;">
                                                                    <xsl:attribute name="onclick">location.replace('<xsl:value-of select="$reinitAction" />');</xsl:attribute>
                                                                </img>
                                                            </xsl:when>
                                                        </xsl:choose>

                                                    </xsl:if>

                                                    <xsl:if test="$showAcceptCancel = true()">
                                                        <xsl:choose>
                                                            <xsl:when test="$cancelAction = ''">
                                                                <input type="image" src="assets/images/btn_cancel_off.gif" srcover="assets/images/btn_cancel_on.gif" name="reset" id="btn_submit" value="Cancel" width="101" height="26" class="middle handCursor" style="margin:0 5px;"/>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <img src="assets/images/btn_cancel_off.gif" srcover="assets/images/btn_cancel_on.gif" id="btn_cancel" class="middle handCursor" width="101" height="26" style="margin:0 5px;">
                                                                    <xsl:attribute name="onclick">location.replace('<xsl:value-of select="$cancelAction" />');</xsl:attribute>
                                                                </img>
                                                            </xsl:otherwise>
                                                        </xsl:choose>

                                                        <xsl:choose>
                                                            <xsl:when test="$acceptAction != ''">
                                                                <img src="assets/images/btn_accept_off.gif" srcover="assets/images/btn_accept_on.gif" id="btn_submit" class="middle handCursor" width="101" height="26" border="0">
                                                                    <xsl:attribute name="onclick"><xsl:value-of select="$acceptAction" /></xsl:attribute>
                                                                </img>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <input type="image" src="assets/images/btn_accept_off.gif" srcover="assets/images/btn_accept_on.gif" id="btn_submit" width="101" height="26" class="middle handCursor" />
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </xsl:if>

                                                </div>
                                            </xsl:when>
                                            <xsl:otherwise>
                                                <div id="actionButtonsContainer">
                                                    <xsl:if test="$login = true()">
                                                        <xsl:attribute name="style">height:1px</xsl:attribute>
                                                    </xsl:if>
                                                    <img src="assets/images/clear.gif" width="10" >
                                                        <xsl:choose>
                                                            <xsl:when test="$login = true()">
                                                                <xsl:attribute name="height">1</xsl:attribute>
                                                            </xsl:when>
                                                            <xsl:otherwise>
                                                                <xsl:attribute name="height">15</xsl:attribute>
                                                            </xsl:otherwise>
                                                        </xsl:choose>
                                                    </img>
                                                </div>
                                            </xsl:otherwise>
                                        </xsl:choose>
                                    </form>

                                    <!--  END CONTENT WELL -->
                                </td>
                                <td width="5" background="assets/images/cnr_mr.gif"><img src="assets/images/clear.gif" width="5" height="10" /></td>
                            </tr>
                            <tr>
                                <td width="5" height="5" background="assets/images/cnr_bl.gif"></td>
                                <td width="100%" height="5" background="assets/images/cnr_bm.gif"></td>
                                <td width="5" height="5" background="assets/images/cnr_br.gif"></td>
                            </tr>
                        </table>

                        <!-- Resources: Footer -->
                        <xsl:call-template name="footer"/>

                    </div>

                </div>

                <script language="JavaScript1.2">
                    <![CDATA[
        // R O U N D E D    C O R N E R S
        // on the inside sections using Rico.js
        // see http://openrico.org/rico/demos.page?demo=rico_corner for options
        try {
        Rico.Corner.round('rt1', {corners:"top", bgColor:'#d5e0ea', compact:true});
        Rico.Corner.round('rb1', {corners:"bottom", bgColor:'#d5e0ea', compact:true});
        } catch(e) {}
      ]]>
                </script>

            </body>
        </html>
    </xsl:template>


    <!--===================-->
    <!-- Header -->
    <!--===================-->
    <xsl:template name="header">
        <div id="logoContainer">
            <img src="assets/images/amx_logo.gif" width="140" height="36" />
        </div>
    </xsl:template>

    <!--===================-->
    <!-- Content           -->
    <!--===================-->
    <xsl:template name="content">

    </xsl:template>

    <!--===================-->
    <!-- Footer            -->
    <!--===================-->
    <xsl:template name="footer">
        <div id="footerContainer">
            <table cellpadding="3" width="100%">
                <tr>
                    <td width="50%" class="center type11">
                        Copyright &#169; 2011 AMX<br />
                    </td>
                </tr>
            </table>
        </div>
    </xsl:template>


</xsl:stylesheet>