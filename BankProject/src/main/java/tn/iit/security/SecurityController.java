package tn.iit.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthoritiesContainer;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwtEncodingException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")

public class SecurityController {
	//spring security utilise un objet autheticationmanager pour s'authnetifier
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtEncoder jwtEncoder;

	//consulter le profil de user authentifie en retrournnzt l'objet authentication
	@GetMapping("/profile")
	public Authentication authentication(Authentication authentication) {
		return authentication;
	} 
	@PostMapping("/login")
	public Map<String, String> login(String username, String password)  {
		 Authentication authentication = authenticationManager.authenticate(
			        new UsernamePasswordAuthenticationToken(username,password)
			    );

			    Instant instant = Instant.now();
			    String scope = authentication.getAuthorities().stream()
			        .map(GrantedAuthority::getAuthority)
			        .collect(Collectors.joining(" "));

			    JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
			        .issuedAt(instant)
			        .expiresAt(instant.plus(10, ChronoUnit.MINUTES))
			        .subject(username)
			        .claim("scope",scope)
			        .build();

			    String jwt = jwtEncoder.encode(JwtEncoderParameters.from(
			        JwsHeader.with(MacAlgorithm.HS512).build(), jwtClaimsSet)).getTokenValue();

			    return Map.of("access-token", jwt);
			}
}
