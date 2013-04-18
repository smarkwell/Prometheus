package org.musteat.prometheus;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.eclipse.jetty.server.Server;

import org.eclipse.jetty.server.handler.ResourceHandler;

public class ServerLauncher
{
	public static void main(String[] args) throws Exception
	{
		ResourceHandler handler = new ResourceHandler();
		
		handler.setDirectoriesListed(true);
		handler.setResourceBase(".");
		Server server = new Server(9090);
		
		server.setHandler(new ResourceHandler());
        
        server.start();
        server.join();
	}


}
